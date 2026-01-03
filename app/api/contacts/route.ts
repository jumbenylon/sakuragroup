export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  // 1. Build Guard
  if (!process.env.DATABASE_URL) return NextResponse.json({ contacts: [] });

  try {
    const prisma = getPrisma();
    // In a real app, you would filter by the logged-in user's ID here
    // For now, we return empty or mock data if no contacts table exists yet
    // const contacts = await prisma.contact.findMany(...) 
    
    return NextResponse.json({ contacts: [] }); // Returns empty list for now so UI doesn't crash
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
