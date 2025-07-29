import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// GET: لیست همه پست‌ها
export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

// POST: ایجاد پست جدید
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, slug, content, excerpt, author, coverUrl } = body;
  const post = await prisma.post.create({
    data: { title, slug, content, excerpt, author, coverUrl },
  });
  return NextResponse.json(post, { status: 201 });
}
