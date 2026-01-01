const baseStyle = `
  margin:0;
  padding:0;
  background:#0b0b0b;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Arial,sans-serif;
`;

const animationStyle = `
<style>
@keyframes glow {
  0% { box-shadow: 0 0 0 rgba(255,255,255,0.0); }
  50% { box-shadow: 0 0 18px rgba(255,255,255,0.35); }
  100% { box-shadow: 0 0 0 rgba(255,255,255,0.0); }
}

@keyframes arrow {
  0% { transform: translateX(0); }
  50% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}
</style>
`;

function container(content: string) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      ${animationStyle}
    </head>
    <body style="${baseStyle}">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:48px 16px">
            <table width="100%" style="max-width:520px;background:#111;border-radius:18px;padding:36px;color:#ffffff">
              ${content}
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function button(label: string, url: string) {
  return `
  <a href="${url}"
    style="
      display:inline-block;
      margin-top:28px;
      padding:15px 30px;
      background:linear-gradient(135deg,#ffffff,#d8d8d8);
      color:#000;
      text-decoration:none;
      font-weight:600;
      border-radius:999px;
      font-size:15px;
      animation:glow 2.5s infinite;
    ">
    ${label}
    <span style="
      display:inline-block;
      margin-left:6px;
      animation:arrow 1.2s infinite;
    ">→</span>
  </a>
  `;
}

function divider() {
  return `
  <div style="
    margin:36px auto;
    width:80px;
    height:1px;
    background:linear-gradient(90deg,transparent,#444,transparent);
  "></div>
  `;
}

/* ============================
   EMAIL DE VÉRIFICATION
============================ */
export function renderVerifyEmail(username: string, verifyUrl: string) {
  return container(`
    <tr>
      <td style="text-align:center">

        <h1 style="letter-spacing:5px;font-weight:700;margin-bottom:6px">
          DIVN
        </h1>

        <p style="opacity:.55;margin-bottom:32px">
          Votre expérience premium commence ici
        </p>

        <p style="font-size:16px;line-height:1.65;opacity:.9">
          Bonjour <strong>${username}</strong>,<br><br>
          Bienvenue chez <strong>DIVN</strong>.<br>
          Confirmez votre adresse e-mail afin d’activer votre compte et accéder à l’ensemble de notre univers.
        </p>

        ${button("Confirmer mon compte", verifyUrl)}

        ${divider()}

        <p style="font-size:13px;opacity:.6;line-height:1.6">
          Ce lien sécurisé expire dans 24 heures.<br>
          Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet e-mail.
        </p>

        <p style="margin-top:28px;font-size:12px;opacity:.45">
          © ${new Date().getFullYear()} DIVN — L’élégance dans le détail
        </p>

      </td>
    </tr>
  `);
}

/* ============================
   EMAIL MOT DE PASSE OUBLIÉ
============================ */
export function renderForgotPasswordEmail(username: string, resetUrl: string) {
  return container(`
    <tr>
      <td style="text-align:center">

        <h1 style="letter-spacing:5px;font-weight:700;margin-bottom:6px">
          DIVN
        </h1>

        <p style="opacity:.55;margin-bottom:32px">
          Réinitialisation sécurisée du mot de passe
        </p>

        <p style="font-size:16px;line-height:1.65;opacity:.9">
          Bonjour <strong>${username}</strong>,<br><br>
          Une demande de réinitialisation de votre mot de passe a été effectuée.
        </p>

        ${button("Réinitialiser mon mot de passe", resetUrl)}

        ${divider()}

        <p style="font-size:13px;opacity:.6;line-height:1.6">
          Si cette demande ne vient pas de vous, aucune action n’est nécessaire.
        </p>

        <p style="margin-top:28px;font-size:12px;opacity:.45">
          © ${new Date().getFullYear()} DIVN — Sécurité & confiance
        </p>

      </td>
    </tr>
  `);
}
