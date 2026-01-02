import prisma from "@/lib/prisma";

const BATCH_SIZE = 500;
const THROTTLE_DELAY = 1500; // 1.5 seconds between batches to avoid 429s

export async function processCampaign(campaignId: string) {
  try {
    // 1. Mark Campaign as Processing
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: "PROCESSING" }
    });

    while (true) {
      // 2. Fetch Pending Batch
      const batch = await prisma.messageLog.findMany({
        where: { campaignId, status: "PENDING" },
        take: BATCH_SIZE,
        include: { user: true, sender: true }
      });

      if (batch.length === 0) break;

      // 3. Atomically lock batch for processing
      await prisma.messageLog.updateMany({
        where: { id: { in: batch.map(m => m.id) }, status: "PENDING" },
        data: { status: "PROCESSING" }
      });

      // 4. Call Provider (Beem)
      try {
        const beemAuth = Buffer.from(`${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`).toString("base64");
        
        // Map batch to Beem recipient format
        const recipients = batch.map((m, index) => ({
          recipient_id: index.toString(),
          dest_addr: m.recipient
        }));

        const response = await fetch("https://apisms.beem.africa/v1/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${beemAuth}`
          },
          body: JSON.stringify({
            source_addr: batch[0].sender?.name || "SAKURA",
            message: batch[0].message,
            recipients: recipients
          })
        });

        const result = await response.json();

        if (response.ok) {
          // Success: Mark batch as SENT
          await prisma.messageLog.updateMany({
            where: { id: { in: batch.map(m => m.id) }, status: "PROCESSING" },
            data: { 
              status: "SENT", 
              sentAt: new Date(),
              providerMessageId: result.request_id ? String(result.request_id) : null 
            }
          });
        } else {
          // Provider Error: Mark batch as FAILED
          await prisma.messageLog.updateMany({
            where: { id: { in: batch.map(m => m.id) }, status: "PROCESSING" },
            data: { 
              status: "FAILED", 
              providerError: result.message || "PROVIDER_REJECTED" 
            }
          });
        }
      } catch (error: any) {
        // Network/System Error: Revert to FAILED to avoid infinite loops
        await prisma.messageLog.updateMany({
          where: { id: { in: batch.map(m => m.id) }, status: "PROCESSING" },
          data: { status: "FAILED", providerError: "NETWORK_TIMEOUT" }
        });
      }

      // 5. Throttling: Wait to respect SMSC throughput
      if (batch.length === BATCH_SIZE) {
        await new Promise(resolve => setTimeout(resolve, THROTTLE_DELAY));
      }
    }

    // 6. Finalize Campaign Status
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: "COMPLETE" }
    });

  } catch (error) {
    console.error("CAMPAIGN_WORKER_CRITICAL_FAILURE:", error);
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: "PARTIAL" }
    });
  }
}
