// /lib/email.ts
import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  text: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DIVN" <no-reply@brevo.com>`, // ✅ SMTP partagé
      to,
      subject,
      text,
    });

    console.log("EMAIL ENVOYÉ ✅");
  } catch (err) {
    console.error("EMAIL_ERROR:", err);
  }
}

