import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(_: any, { params }: any) {
  const admin = await getUserFromSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({}, { status: 403 })

  await prisma.user.update({
    where: { id: params.id },
    data: { isBlocked: true }
  })

  await prisma.adminLog.create({
    data: {
      adminId: admin.id,
      action: 'BLOCK_USER',
      targetUserId: params.id
    }
  })

  return NextResponse.json({ ok: true })
}
