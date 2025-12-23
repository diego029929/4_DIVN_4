import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return new Response("Token manquant", { status: 400 });

  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record) return new Response("Token invalide", { status: 400 });

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return new Response("Token expiré", { status: 400 });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { isVerified: true },
  });

  await prisma.verificationToken.delete({ where: { id: record.id } });

  return Response.redirect("https://ton-site.com/profile");
}
