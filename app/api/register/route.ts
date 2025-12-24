export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const emailNormalized = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        password: hashedPassword,
        username,
      },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

    await sendEmail({
      to: emailNormalized,
      subject: "Confirme ton compte",
      text: `Bonjour ${username || ""},\n\nClique ici pour vérifier ton compte : ${verificationUrl}`,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
