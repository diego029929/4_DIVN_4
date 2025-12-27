import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER!,
        pass: process.env.BREVO_SMTP_PASS!,
      },
      connectionTimeout: 10_000,
    });

    await transporter.sendMail({
      from: "no-reply@brevo.com",
      to: "wist.infodev@gmail.com",
      subject: "TEST BREVO RENDER",
      text: "Si tu reçois ça, BREVO + RENDER OK",
    });

    return new Response("EMAIL ENVOYÉ ✅");
  } catch (err: any) {
    console.error("SMTP_ERROR:", err);
    return new Response(
      "ERREUR SMTP ❌ : " + err.message,
      { status: 500 }
    );
  }
}
