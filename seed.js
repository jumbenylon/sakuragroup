const { PrismaClient } = require('@prisma/client')
const { hash } = require('@node-rs/argon2')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@sakuragroup.co.tz'
  const passwordRaw = 'Sakura2025!' // 👈 THIS IS YOUR PASSWORD
  
  console.log(`Hashing password for ${email}...`)
  
  // Hash the password securely
  const passwordHash = await hash(passwordRaw, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });

  console.log(`Updating Database...`)
  
  const user = await prisma.user.upsert({
    where: { email },
    update: { 
        status: 'ACTIVE', 
        role: 'ADMIN',
        password: passwordHash // Update password if user exists
    },
    create: {
      email,
      name: 'Sovereign Admin',
      role: 'ADMIN',
      status: 'ACTIVE', 
      organization: 'Sakura HQ',
      balance: 50000,
      password: passwordHash
    },
  })
  
  console.log('✅ SUCCESS: Login with:')
  console.log('   Email: admin@sakuragroup.co.tz')
  console.log('   Pass:  Sakura2025!')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { 
      console.error('❌ ERROR:', e); 
      await prisma.$disconnect(); 
      process.exit(1) 
  })
