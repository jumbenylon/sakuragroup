// SakuraPay signs the message with its Secret Key
const signature = crypto.createHmac('sha256', process.env.BRIDGE_SECRET)
                        .update(reference).digest('hex');

await fetch("https://axis.sakuragroup.co.tz/api/hooks/credit-node", {
  method: "POST",
  headers: { "X-Sakura-Signature": signature },
  body: JSON.stringify({ reference, credits: 1000, userEmail: "client@example.com" })
});
