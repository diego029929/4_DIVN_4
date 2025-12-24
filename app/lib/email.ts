// /lib/email.ts
import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: EmailOptions) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP non configuré, email non envoyé");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"DIVN" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Erreur envoi email:", err);
  }
}
