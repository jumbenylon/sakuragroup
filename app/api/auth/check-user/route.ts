import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ exists: false }, { status: 400 });

    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    // We return a simple boolean. No session required.
    return NextResponse.json({ exists: !!user });
  } catch (error) {
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
