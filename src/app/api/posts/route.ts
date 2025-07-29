import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: لیست همه پست‌ها
export async function GET() {
  try {
    const posts = await prisma.post.findMany({ 
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}

// POST: ایجاد پست جدید
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, content, excerpt, author, coverUrl } = body;
    const post = await prisma.post.create({
      data: { 
        title, 
        slug, 
        content, 
        excerpt, 
        coverUrl,
        authorId: author || 'default-author-id' // You might want to get this from session
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' }, 
      { status: 500 }
    );
  }
}
