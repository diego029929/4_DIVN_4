import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const rawToken = url.searchParams.get("token");

    if (!rawToken) return new Response("Token manquant", { status: 400 });

    const token = decodeURIComponent(rawToken);

    console.log("VERIFY TOKEN:", token);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    // 🔹 Chercher le token dans la DB
    const record = await prisma.verificationToken.findUnique({ where: { token } });
    if (!record) return new Response("Token invalide", { status: 400 });

    // 🔹 Vérifier expiration
    if (record.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return new Response("Token expiré", { status: 400 });
    }

    // 🔹 Valider l’utilisateur IMMÉDIATEMENT
    await prisma.user.update({
      where: { id: record.userId },
      data: { isVerified: true },
    });

    // 🔹 Supprimer le token pour qu’il ne soit plus réutilisable
    await prisma.verificationToken.delete({ where: { token } });

    // 🔹 Rediriger vers profile
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`);
  } catch (err) {
    console.error("Erreur /api/verify:", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
  
