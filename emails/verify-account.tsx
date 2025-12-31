export function verifyAccountEmailHtml(username: string, verifyUrl: string) {
  return `
  <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
    <h1 style="color:#111;">Bienvenue chez DIVN, ${username}!</h1>
    <p>Merci de créer un compte. Clique sur le bouton ci-dessous pour vérifier ton compte :</p>
    <a href="${verifyUrl}" 
       style="display:inline-block; padding:12px 24px; margin-top:20px; background-color:#000; color:#fff; text-decoration:none; font-weight:bold; border-radius:6px;">
       Clique ici →
    </a>
    <p style="margin-top:20px; font-size:12px; color:#888;">Ce lien expirera dans 24h.</p>
  </div>
  `;
}
