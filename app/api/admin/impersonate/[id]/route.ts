import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { getUserFromSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(_: any, { params }: any) {
  const admin = await getUserFromSession()
  if (admin?.role !== 'ADMIN') return NextResponse.json({}, { status: 403 })

  cookies().set('impersonator', admin.id)
  cookies().set('session', params.id)

  await prisma.adminLog.create({
    data: {
      adminId: admin.id,
      action: 'IMPERSONATE',
      targetUserId: params.id
    }
  })

  return NextResponse.json({ ok: true })
}
