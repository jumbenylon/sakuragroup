const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const email = 'admin@sakuragroup.co.tz'

  console.log(`Checking for ${email}...`)

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
        status: 'ACTIVE', 
        role: 'ADMIN' 
    },
    create: {
      email,
      name: 'Sovereign Admin',
      role: 'ADMIN',
      status: 'ACTIVE', // Critical for login
      organization: 'Sakura HQ',
      balance: 50000 // Give yourself some starting cash
    },
  })

  console.log('✅ SUCCESS: Admin User Created:', user)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { 
      console.error('❌ ERROR:', e); 
      await prisma.$disconnect(); 
      process.exit(1) 
  })
