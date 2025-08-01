import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // ایجاد کاربر admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'مدیر کل',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN'
      }
    });

    // ایجاد کاربر author
    const authorPassword = await bcrypt.hash('author123', 10);
    const author = await prisma.user.upsert({
      where: { email: 'author@example.com' },
      update: {},
      create: {
        name: 'نویسنده نمونه',
        email: 'author@example.com',
        password: authorPassword,
        role: 'AUTHOR'
      }
    });

    // ایجاد پست‌های نمونه
    const posts = await Promise.all([
      prisma.post.upsert({
        where: { slug: 'welcome-post' },
        update: {},
        create: {
          title: 'خوش آمدید به وبلاگ',
          slug: 'welcome-post',
          content: `
            <h1>خوش آمدید!</h1>
            <p>این اولین پست وبلاگ است. در اینجا می‌توانید مطالب جالب و مفید بخوانید.</p>
            <h2>ویژگی‌های وبلاگ:</h2>
            <ul>
              <li>سیستم نقش‌بندی کاربران</li>
              <li>ادیتور متن پیشرفته</li>
              <li>سیستم نظرات</li>
              <li>سیستم لایک</li>
            </ul>
          `,
          excerpt: 'خوش آمدید به وبلاگ جدید ما. در اینجا می‌توانید مطالب جالب و مفید بخوانید.',
          published: true,
          authorId: admin.id
        }
      }),
      prisma.post.upsert({
        where: { slug: 'second-post' },
        update: {},
        create: {
          title: 'دومین پست وبلاگ',
          slug: 'second-post',
          content: `
            <h1>دومین پست</h1>
            <p>این دومین پست وبلاگ است که توسط نویسنده ایجاد شده است.</p>
            <p>در این پست می‌توانید درباره موضوعات مختلف بخوانید.</p>
          `,
          excerpt: 'دومین پست وبلاگ که توسط نویسنده ایجاد شده است.',
          published: true,
          authorId: author.id
        }
      }),
      prisma.post.upsert({
        where: { slug: 'third-post' },
        update: {},
        create: {
          title: 'سومین پست با محتوای بیشتر',
          slug: 'third-post',
          content: `
            <h1>سومین پست</h1>
            <p>این پست محتوای بیشتری دارد و برای تست سیستم طراحی شده است.</p>
            <h2>بخش اول</h2>
            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
            <h2>بخش دوم</h2>
            <p>چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
          `,
          excerpt: 'سومین پست وبلاگ با محتوای بیشتر برای تست سیستم.',
          published: true,
          authorId: admin.id
        }
      })
    ]);

    // ایجاد نظرات نمونه
    const comments = await Promise.all([
      prisma.comment.create({
        data: {
          content: 'پست بسیار خوبی بود!',
          authorId: author.id,
          postId: posts[0].id,
          approved: true
        }
      }),
      prisma.comment.create({
        data: {
          content: 'ممنون از اشتراک‌گذاری این مطلب',
          authorId: admin.id,
          postId: posts[1].id,
          approved: true
        }
      })
    ]);

    // ایجاد لایک‌های نمونه
    const likes = await Promise.all([
      prisma.like.upsert({
        where: {
          userId_postId: {
            userId: author.id,
            postId: posts[0].id
          }
        },
        update: {},
        create: {
          userId: author.id,
          postId: posts[0].id
        }
      }),
      prisma.like.upsert({
        where: {
          userId_postId: {
            userId: admin.id,
            postId: posts[1].id
          }
        },
        update: {},
        create: {
          userId: admin.id,
          postId: posts[1].id
        }
      })
    ]);

    return NextResponse.json({
      message: 'دیتابیس با موفقیت پر شد',
      data: {
        users: 2,
        posts: posts.length,
        comments: comments.length,
        likes: likes.length
      }
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'خطا در پر کردن دیتابیس' },
      { status: 500 }
    );
  }
} 