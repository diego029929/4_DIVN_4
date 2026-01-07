import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(users)
}
