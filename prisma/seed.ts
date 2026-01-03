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

  // --- 2. INITIALIZE PRICING TIERS & GLOBAL COST ---
  console.log("💰 Seeding Financial Parameters...");
  const configs = [
    { key: "GLOBAL_BUY_PRICE", value: "18", label: "Our cost from Beem per SMS" },
    { key: "TIER_CORE", value: "28", label: "Standard SME Rate" },
    { key: "TIER_GROWTH", value: "24", label: "High Volume SME Rate" },
    { key: "TIER_ENTERPRISE", value: "20", label: "Corporate Rate" },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  // --- 3. CREATE MASTER ADMIN (GENESIS USER) ---
  console.log("👤 Creating Master Admin Identity...");
  const adminPassword = await hash("Abrahamjr", {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@sakuragroup.co.tz" },
    update: {
      role: "ADMIN",
      status: "ACTIVE", // Admin is active by default
    },
    create: {
      email: "admin@sakuragroup.co.tz",
      password: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      balance: 1000000, // Initial admin testing credit
      smsRate: 0, // Admin does not pay for internal testing
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
