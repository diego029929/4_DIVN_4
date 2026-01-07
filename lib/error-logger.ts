import { prisma } from '@/lib/prisma'

export async function logError(err: any, userId?: string, url?: string) {
  await prisma.errorLog.create({
    data: {
      userId,
      message: err.message,
      stack: err.stack,
      url
    }
  })
}
