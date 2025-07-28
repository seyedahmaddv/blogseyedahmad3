import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: دریافت یک پست بر اساس id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json(post);
}

// PUT: ویرایش یک پست بر اساس id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(post);
}

// DELETE: حذف یک پست بر اساس id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.post.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
