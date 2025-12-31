// lib/email.ts
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "DIVN", email: "wist.infodev@gmail.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text || "Veuillez utiliser un client email compatible HTML.",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("EMAIL ENVOYÉ ✅ à", to);
  } catch (err) {
    console.error("EMAIL_ERROR:", err);
  }
  }
