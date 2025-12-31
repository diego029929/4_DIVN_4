export function forgotPasswordEmailHtml(username: string, resetUrl: string) {
  return `
  <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
    <h1 style="color:#111;">Bonjour ${username},</h1>
    <p>Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
    <a href="${resetUrl}" 
       style="display:inline-block; padding:12px 24px; margin-top:20px; background-color:#000; color:#fff; text-decoration:none; font-weight:bold; border-radius:6px;">
       Réinitialiser le mot de passe →
    </a>
    <p style="margin-top:20px; font-size:12px; color:#888;">Ce lien expirera dans 1h.</p>
  </div>
  `;
}
