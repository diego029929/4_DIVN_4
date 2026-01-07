import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserFromSession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const user = await getUserFromSession(req)

  // User bloqué
  if (user?.isBlocked) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Zone admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
