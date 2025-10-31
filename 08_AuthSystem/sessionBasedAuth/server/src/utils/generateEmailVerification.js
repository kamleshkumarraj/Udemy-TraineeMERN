export const generateEmailVerification = (verificationURL) => {
  const mailTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Verify your email</title>
    <style>
      @media only screen and (max-width: 480px) {
        .container { width: 100% !important; padding: 12px !important; }
        .stack-column { display: block !important; width: 100% !important; }
        .hero { font-size: 20px !important; line-height: 26px !important; }
        .btn { padding: 12px 18px !important; font-size: 16px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111;">
    <span style="display:none; font-size:1px; color:#f4f6f8; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      Confirm your email to activate your {{company_name}} account.
    </span>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8;">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.08); overflow:hidden;">
            
            <tr>
              <td style="padding:24px; text-align:left; background:linear-gradient(90deg,#0ea5a4, #06b6d4);">
                <img src="{{logo_url}}" alt="{{company_name}} logo" width="120" style="display:block; border:0; outline:none; text-decoration:none;" />
              </td>
            </tr>

            <tr>
              <td style="padding:28px 28px 20px;">
                <h1 class="hero" style="margin:0 0 12px; font-size:24px; line-height:30px; color:#0f172a; font-weight:700;">
                  Verify your email address
                </h1>
                <p style="margin:0 0 20px; font-size:16px; line-height:24px; color:#334155;">
                  Hi {{username}},<br />
                  Thanks for creating an account with <strong>{{Auth Server}}</strong>. Please verify your email so you can start using your account.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0;">
                  <tr>
                    <td align="center">
                      <a href="${verificationURL}"
                         class="btn"
                         style="display:inline-block; text-decoration:none; font-weight:600; font-size:15px; padding:14px 22px; border-radius:8px; background-color:#06b6d4; color:#ffffff; border:1px solid #06b6d4;">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 12px; font-size:14px; color:#64748b;">
                  If the button above doesn't work, copy and paste the following URL into your browser:
                </p>
                <p style="word-break:break-all; font-size:13px; color:#0ea5a4; margin:0 0 20px;">
                  <a href="${verificationURL}" style="color:#0ea5a4; text-decoration:underline;">${verificationURL}</a>
                </p>

                <hr style="border:none; border-top:1px solid #eef2f7; margin:18px 0;" />

                <p style="margin:0; font-size:13px; color:#64748b;">
                  This verification link will expire in <strong>24 hours</strong>. If you didn't create an account, you can ignore this email or contact us at
                  <a href="mailto:{{kamleshkumar.dev86034@gmail.com}}" style="color:#06b6d4; text-decoration:none;">{{kamleshkumar.dev86034@gmail.com}}</a>.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px 28px; background-color:#fbfbfc; text-align:left;">
                <p style="margin:0 0 6px; font-size:13px; color:#94a3b8;">
                  Regards,<br />
                  <strong>{{Auth Server}} Team</strong>
                </p>
                <p style="margin:10px 0 0; font-size:12px; color:#94a3b8;">
                  © 2025 {{Auth Server}}. All rights reserved.
                </p>
                <p style="margin:12px 0 0; font-size:12px; color:#94a3b8;">
                  <a href="{{company_website}}" style="color:#06b6d4; text-decoration:none;">Visit our website</a> •
                  <a href="mailto:{{kamleshkumar.dev86034@gmail.com}}" style="color:#06b6d4; text-decoration:none;">Support</a>
                </p>
              </td>
            </tr>
          </table>

          <table role="presentation" width="600" style="max-width:600px; margin-top:10px;">
            <tr>
              <td style="padding:12px; text-align:center; font-size:12px; color:#99a3b1;">
                You received this email because you created an account at {{Auth Server}}. If this wasn't you, you can safely ignore it.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
