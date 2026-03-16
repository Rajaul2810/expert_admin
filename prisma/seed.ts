import { PrismaClient } from "@prisma/client"
import { DEMO_USERS } from "../lib/demo-users"
import { DEMO_EXPERTS } from "../lib/experts-data"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.expert.deleteMany()
  for (const u of DEMO_USERS) {
    await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        joinedAt: new Date(u.joined),
      },
    })
  }
  for (const e of DEMO_EXPERTS) {
    await prisma.expert.create({
      data: {
        name: e.name,
        category: e.category,
        rating: e.rating,
        sessions: e.sessions,
        duration: e.duration,
        price: e.price,
        image: e.image,
        bio: e.bio,
      },
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
