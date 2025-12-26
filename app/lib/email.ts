// /lib/email.ts
import SparkPost from "sparkpost";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const client = process.env.SPARKPOST_API_KEY
  ? new SparkPost(process.env.SPARKPOST_API_KEY)
  : null;

export async function sendEmail({ to, subject, text }: EmailOptions) {
  try {
    if (!client) {
      console.warn("SparkPost non configuré, email non envoyé");
      return;
    }

    await client.transmissions.send({
      content: {
        from: "testing@sparkpostbox.com", // 🔑 Obligatoire pour gratuit
        subject,
        text,
      },
      recipients: [{ address: to }],
    });

    console.log(`Email envoyé à ${to} avec succès`);
  } catch (err) {
    console.error("EMAIL_ERROR:", err);
  }
      }
