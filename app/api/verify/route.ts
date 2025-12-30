console.log("VERIFY TOKEN URL:", token);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawToken = url.searchParams.get("token");

  if (!rawToken) {
    return new Response("Token manquant", { status: 400 });
  }

  const token = decodeURIComponent(rawToken);

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return new Response("Token invalide", { status: 400 });
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { token },
    });
    return new Response("Token expiré", { status: 400 });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { isVerified: true },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return Response.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile`
  );
}
