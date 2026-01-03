export async function POST(req: Request) {
  try {
    const { userId, amount, adminId } = await req.json();

    // Atomic transaction: Update user balance and log it if you have a transaction table
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: amount
        }
      }
    });

    // TODO: Log this as a Transaction in a separate model if desired
    console.log(`PROVISION: Admin ${adminId} added ${amount} TZS to User ${userId}`);

    return NextResponse.json({ success: true, newBalance: updatedUser.balance });
  } catch (error) {
    return NextResponse.json({ success: false, error: "PROVISION_ERROR" }, { status: 500 });
  }
}
