const baseStyle = `
  margin:0;
  padding:0;
  background:#0b0b0b;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Arial,sans-serif;
`;

function container(content: string) {
  return `
  <div style="${baseStyle}">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px">
          <table width="100%" style="max-width:520px;background:#111;border-radius:16px;padding:32px;color:#ffffff">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}

function button(label: string, url: string) {
  return `
  <a href="${url}"
    style="
      display:inline-block;
      margin-top:24px;
      padding:14px 26px;
      background:linear-gradient(135deg,#ffffff,#d4d4d4);
      color:#000;
      text-decoration:none;
      font-weight:600;
      border-radius:999px;
      font-size:15px;
    ">
    ${label} →
  </a>
  `;
}

/* ============================
   EMAIL VERIFICATION
============================ */
export function renderVerifyEmail(username: string, verifyUrl: string) {
  return container(`
    <tr>
      <td style="text-align:center">
        <h1 style="letter-spacing:4px;font-weight:700;margin-bottom:8px">
          DIVN
        </h1>
        <p style="opacity:.6;margin-bottom:32px">
          Verify your account
        </p>

        <p style="font-size:16px;line-height:1.6">
          Hello <strong>${username}</strong>,<br><br>
          Welcome to <strong>DIVN</strong>.  
          Please confirm your email address to activate your account and access the full experience.
        </p>

        ${button("Confirm my account", verifyUrl)}

        <p style="margin-top:32px;font-size:13px;opacity:.6">
          This link expires in 24 hours.<br>
          If you didn’t create an account, you can ignore this email.
        </p>

        <hr style="margin:32px 0;border:none;border-top:1px solid #222"/>

        <p style="font-size:12px;opacity:.5">
          © ${new Date().getFullYear()} DIVN — All rights reserved
        </p>
      </td>
    </tr>
  `);
}

/* ============================
   EMAIL FORGOT PASSWORD
============================ */
export function renderForgotPasswordEmail(username: string, resetUrl: string) {
  return container(`
    <tr>
      <td style="text-align:center">
        <h1 style="letter-spacing:4px;font-weight:700;margin-bottom:8px">
          DIVN
        </h1>
        <p style="opacity:.6;margin-bottom:32px">
          Password reset
        </p>

        <p style="font-size:16px;line-height:1.6">
          Hello <strong>${username}</strong>,<br><br>
          A request was made to reset your password.
        </p>

        ${button("Reset my password", resetUrl)}

        <p style="margin-top:32px;font-size:13px;opacity:.6">
          If this wasn’t you, you can safely ignore this email.
        </p>

        <hr style="margin:32px 0;border:none;border-top:1px solid #222"/>

        <p style="font-size:12px;opacity:.5">
          © ${new Date().getFullYear()} DIVN — Secure & Private
        </p>
      </td>
    </tr>
  `);
}
