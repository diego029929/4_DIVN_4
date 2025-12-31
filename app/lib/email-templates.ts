export function renderVerifyEmail(username: string, verifyUrl: string) {
  return `
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Confirme ton compte DIVN</title>
    <style>
      body { margin:0; font-family: 'Arial', sans-serif; background:#f3f4f6; }
      .container {
        max-width:600px; margin:40px auto; background:#ffffff;
        border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);
      }
      .header { background: linear-gradient(135deg, #4f46e5, #6366f1); padding:30px; text-align:center; color:#fff; }
      .header h1 { margin:0; font-size:28px; }
      .body { padding:40px; text-align:center; color:#111; }
      .body p { font-size:16px; line-height:1.5; margin:20px 0; }
      .btn {
        display:inline-block; padding:16px 36px; margin-top:30px; background:#4f46e5;
        color:#fff; font-weight:bold; font-size:16px; border-radius:12px; text-decoration:none;
        box-shadow:0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;
      }
      .btn:hover { background:#3730a3; transform:scale(1.05); }
      .footer { font-size:12px; color:#666; margin:30px 0 20px; }
      .gif { margin-top:20px; }
      @media (max-width: 600px) {
        .body { padding:20px; }
        .btn { padding:14px 28px; font-size:14px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bienvenue chez DIVN, ${username}!</h1>
      </div>
      <div class="body">
        <p>Merci d'avoir créé ton compte. Clique sur le bouton ci-dessous pour vérifier ton compte :</p>
        <a href="${verifyUrl}" class="btn">Clique ici →</a>
        <p class="footer">Ce lien expirera dans 24h.</p>
        <div class="gif">
          <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="🎉" width="120" />
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
