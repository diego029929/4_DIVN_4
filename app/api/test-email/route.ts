import nodemailer from "nodemailer";

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
    });

    await transporter.sendMail({
      from: "no-reply@brevo.com",
      to: "TON_EMAIL_PERSO@gmail.com", // METS TON EMAIL
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
       
