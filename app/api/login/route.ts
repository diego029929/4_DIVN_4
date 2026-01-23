import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { logtail } from "lib/logger";

export async function POST(req: Request) {
  try {
    logtail.info("Connexion - tentative");

    const { email, password } = await req.json();

    if (!email || !password) {
      logtail.warn("Connexion refusée : champs manquants", { email });

      return NextResponse.json(
        { error: "Veuillez remplir tous les champs." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logtail.warn("Connexion refusée : utilisateur introuvable", { email });

      return NextResponse.json(
        { error: "Adresse email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      logtail.warn("Connexion refusée : compte non vérifié", {
        userId: user.id,
        email,
      });

      return NextResponse.json(
        { error: "Votre compte n’est pas encore vérifié." },
        { status: 403 }
      );
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      logger.warn("Connexion refusée : mot de passe incorrect", {
        userId: user.id,
        email,
      });

      return NextResponse.json(
        { error: "Adresse email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    logtail.info("Connexion réussie", {
      userId: user.id,
      email,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logtail.error("Erreur serveur lors de la connexion", {
      error,
    });

    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
