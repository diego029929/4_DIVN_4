import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-server";

export async function logError(error: Error, url?: string) {
  const user = await getCurrentUser();

  await prisma.errorLog.create({
    data: {
      userId: user?.id,
      message: error.message,
      stack: error.stack,
      url,
    },
  });
}
