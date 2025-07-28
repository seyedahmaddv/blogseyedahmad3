import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: 'اولین پست وبلاگ',
        slug: 'first-post',
        content: '<p>این اولین پست وبلاگ است. خوش آمدید!</p>',
        excerpt: 'خلاصه اولین پست وبلاگ',
        author: 'سید احمد',
        coverUrl: '',
      },
      {
        title: 'آموزش Next.js',
        slug: 'nextjs-tutorial',
        content: '<p>در این پست با Next.js و مزایای آن آشنا می‌شوید.</p>',
        excerpt: 'آشنایی با Next.js',
        author: 'سید احمد',
        coverUrl: '',
      },
      {
        title: 'نمونه پست انگلیسی',
        slug: 'english-post',
        content: '<p>This is a sample English blog post.</p>',
        excerpt: 'Sample English post',
        author: 'Ahmad',
        coverUrl: '',
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
