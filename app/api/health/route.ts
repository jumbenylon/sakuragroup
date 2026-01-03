export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // Use the safe getter
import { Resend } from "resend";

export async function GET() {
  // 1. Build-Time Guard
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ status: "BUILD_MODE" }, { status: 200 });
  }

  const report: any = {
    timestamp: new Date().toISOString(),
    services: { database: "checking", resend: "checking", beem: "checking" }
  };

  try {
    const prisma = getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    report.services.database = "HEALTHY";
  } catch (e) {
    report.services.database = "DISCONNECTED";
  }

  // 2. Resend Pulse (API Key Validation)
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      // We check if the instance initializes; actual validation happens on first send
      report.services.resend = "CONFIGURED";
    } else {
      report.services.resend = "MISSING_KEY";
    }
  } catch (e) {
    report.services.resend = "ERROR";
  }

  // 3. Beem Pulse
  if (process.env.BEEM_API_KEY && process.env.BEEM_SECRET) {
    report.services.beem = "CONFIGURED";
  } else {
    report.services.beem = "MISSING_KEYS";
  }

  // Final Verdict
  const isHealthy = Object.values(report.services).every(s => s === "HEALTHY" || s === "CONFIGURED");
  
  return NextResponse.json(report, { status: isHealthy ? 200 : 500 });
}
