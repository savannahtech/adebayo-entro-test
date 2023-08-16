import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    task: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'done',
        },
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'open',
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    task: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'done',
        },
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'open',
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    task: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'done',
        },
        {
          title: 'Ask a question about Prisma on GitHub',
          description: 'To live is to risk it all. Otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.',
          status: 'open',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })