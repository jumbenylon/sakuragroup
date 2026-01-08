export async function POST(req: Request) {
  const data = await req.json();
  const sig = req.headers.get("X-Sakura-Signature");

  // Verify signature using Axis's copy of the API Secret
  if (isValidSignature(data.reference, sig)) {
    // Update Axis's OWN database to add credits
    await axisPrisma.user.update({ ... });
    return NextResponse.json({ status: "Credits Added" });
  }
}
