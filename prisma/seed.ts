import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a default user first
  const defaultUser = await prisma.user.upsert({
    where: { email: 'default@example.com' },
    update: {},
    create: {
      email: 'default@example.com',
      name: 'Default User',
      password: 'hashedpassword', // In real app, hash this
    },
  })

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: 'اولین پست تستی',
        slug: 'first-test-post',
        content: 'این یک پست تستی است برای بررسی عملکرد سیستم.',
        excerpt: 'خلاصه پست اول',
        authorId: defaultUser.id,
        coverUrl: 'https://via.placeholder.com/800x400',
        published: true,
      },
      {
        title: 'دومین پست تستی',
        slug: 'second-test-post',
        content: 'این پست دوم است که برای تست سیستم ایجاد شده.',
        excerpt: 'خلاصه پست دوم',
        authorId: defaultUser.id,
        coverUrl: 'https://via.placeholder.com/800x400',
        published: true,
      },
      {
        title: 'سومین پست تستی',
        slug: 'third-test-post',
        content: 'این پست سوم است که برای تست کامل سیستم ایجاد شده.',
        excerpt: 'خلاصه پست سوم',
        authorId: defaultUser.id,
        coverUrl: 'https://via.placeholder.com/800x400',
        published: true,
      },
    ],
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
