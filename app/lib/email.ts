export async function sendEmail(
  to: string,
  subject: string,
  text: string
) {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "DIVN",
          email: "no-reply@brevo.com"
        },
        to: [{ email: to }],
        subject,
        textContent: text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("EMAIL ENVOYÉ ✅");
  } catch (err) {
    console.error("EMAIL_ERROR:", err);
  }
  }
        
