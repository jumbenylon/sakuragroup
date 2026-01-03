import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 INITIALIZING GENESIS PROTOCOL: AXIS BY SAKURA");

  // --- 1. SYSTEM HEALTH CHECK ---
  console.log("🔍 Checking Infrastructure Keys...");
  const hasBeem = !!(process.env.BEEM_API_KEY && process.env.BEEM_SECRET);
  const hasResend = !!process.env.RESEND_API_KEY;

  console.log(`- Beem SMS Gateway: ${hasBeem ? "ACTIVE" : "MISSING"}`);
  console.log(`- Resend Email Engine: ${hasResend ? "ACTIVE" : "MISSING"}`);

  // --- 2. CREATE MASTER ADMIN (GENESIS USER) ---
  console.log("👤 Creating Master Admin Identity...");

  // We use your specific parameters to ensure high security
  const adminPassword = await hash("Abrahamjr", {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@sakuragroup.co.tz" },
    update: {
      role: "ADMIN",
      status: "ACTIVE", // Ensure Admin is always active
      password: adminPassword, // Ensure password updates if you run seed again
    },
    create: {
      email: "admin@sakuragroup.co.tz",
      password: adminPassword,
      name: "Sakura Admin",          // Added: Required for Dashboard
      organization: "Sakura Group HQ", // Added: Required for Dashboard
      phoneNumber: "+255700000000",    // Added: Required for Dashboard
      role: "ADMIN",
      status: "ACTIVE",
      balance: 1000000,
      smsRate: 0,
    },
  });

  console.log(`✅ GENESIS COMPLETE. Admin Node Active: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error("❌ GENESIS FAILED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
