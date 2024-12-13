import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'iamzaidakbar+admin@gmail.com'
  const password = '%Fortress123&'
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN'
    },
    create: {
      email,
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('Admin user created:', admin)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 