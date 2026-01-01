type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  if (!to) {
    throw new Error("EMAIL_ERROR: destinataire manquant");
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
        email: "wist.infodev@gmail.com",
      },
      to: [
        {
          email: to, // 🔥 ICI LE VRAI DESTINATAIRE
        },
      ],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("BREVO ERROR:", err);
    throw new Error(err);
  }

  console.log("EMAIL ENVOYÉ ✅ →", to);
}
