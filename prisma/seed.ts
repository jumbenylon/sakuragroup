import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("🛠️ Starting Sakura Axis Genesis...")

  const adminEmail = "admin@sakuragroup.co.tz"
  // Specific password provided: rsw+ug^nGFK96
  const hashedPassword = await bcrypt.hash("rsw+ug^nGFK96", 12)

  // 1. Create/Update Master Admin
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword, // Ensure password is set to your request
      role: 'ADMIN',
      status: 'ACTIVE',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      balance: 0,      // Sync this via Beem API later
      smsRate: 21,     // Admin default sell rate
    },
  })

  // 2. Initialize System Pricing (Margin Logic)
  const configs = [
    { key: "BUY_PRICE_BEEM", value: "18", label: "Our cost from Beem" },
    { key: "TIER_CORE", value: "28", label: "Retail Rate" },
    { key: "TIER_GROWTH", value: "24", label: "SME Rate" },
    { key: "TIER_ENTERPRISE", value: "20", label: "Corporate Rate" }
  ]

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    })
  }

  console.log(`✅ Genesis Complete. Master Admin: ${adminEmail}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
