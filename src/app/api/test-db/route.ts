import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test basic database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Test if we can query the Post table
    const postCount = await prisma.post.count();
    
    // Test if we can query the User table
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection is working',
      timestamp: new Date().toISOString(),
      data: {
        connectionTest: result,
        postCount,
        userCount,
        databaseUrl: process.env.STORAGE_URL ? 'Set' : 'Not set',
        oldDatabaseUrl: process.env.DATABASE_URL ? 'Set (old)' : 'Not set'
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.STORAGE_URL ? 'Set' : 'Not set',
      oldDatabaseUrl: process.env.DATABASE_URL ? 'Set (old)' : 'Not set'
    }, { status: 500 });
  }
} 