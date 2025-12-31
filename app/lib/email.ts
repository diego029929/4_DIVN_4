export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!to) {
    throw new Error("Destinataire email manquant");
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: "DIVN",
        email: "wist.infodev@gmail.com", // ⚠️ doit être validé chez Brevo
      },
      to: [
        {
          email: to, // ✅ ICI la vraie correction
        },
      ],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  console.log("EMAIL ENVOYÉ ✅", to);
}
