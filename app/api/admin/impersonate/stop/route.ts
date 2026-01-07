import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const adminId = cookies().get('impersonator')?.value
  if (!adminId) return NextResponse.json({}, { status: 400 })

  cookies().set('session', adminId)
  cookies().delete('impersonator')

  return NextResponse.json({ ok: true })
}
