/**
 * Reset Password Email Template
 * Template for sending password reset links
 */

export const RESET_PASSWORD_EMAIL_SUBJECT =
  "Yêu cầu thay đổi mật khẩu - SOW WEAR";

export const RESET_PASSWORD_EMAIL_TEXT = (userName, resetLink, expiryMinutes) =>
  `Xin chào ${userName}, bạn đã yêu cầu đặt lại mật khẩu tài khoản Sow Wear. Nhấn vào liên kết bên dưới để thay đổi mật khẩu của bạn: ${resetLink}. Liên kết này sẽ hết hạn trong ${expiryMinutes} phút.`;

export const RESET_PASSWORD_EMAIL_HTML = (
  userName,
  resetLink,
  expiryMinutes
) => `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Yêu cầu thay đổi mật khẩu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: "Roboto", system-ui, -apple-system, "Segoe UI",
          "Helvetica Neue", Arial, sans-serif;
      }

      .email-wrapper {
        background-color: #ffffff;
      }

      .main-table {
        max-width: 600px;
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .header-section {
        background-color: #000000;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }

      .brand-name {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 0.03em;
        color: #ffffff;
        padding: 16px 32px;
      }

      .gradient-section {
        background: radial-gradient(ellipse at top left, #fcd0ff 0%, transparent 50%),
          radial-gradient(ellipse at top right, #e6f3ff 0%, transparent 50%),
          linear-gradient(180deg, rgba(243, 227, 255, 0.6) 0%, #ffffff 70%);
        padding: 48px 32px;
      }

      .white-card {
        max-width: 100%;
        margin: 0 auto;
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
      }

      .card-content {
        padding: 0;
      }

      .title {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
        font-weight: bold;
        color: #111827;
        padding-bottom: 24px;
      }

      .greeting {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: bold;
        color: #333;
        padding-bottom: 24px;
      }

      .description {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        color: #666;
        line-height: 1.6;
        padding: 0 0 24px 0;
      }

      .button-container {
        margin-bottom: 24px;
      }

      .reset-button {
        background-color: #111827;
        color: #ffffff;
        padding: 16px 32px;
        border-radius: 25px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        border: none;
        cursor: pointer;
      }

      .expiry-text {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #666;
        line-height: 1.6;
        padding: 0 0 40px 0;
      }

      .warning-text {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        color: #666;
        line-height: 1.6;
        padding: 0 60px;
      }

      .footer-section {
        background-color: rgb(17, 11, 11);
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        padding: 32px;
      }

      .footer-brand {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.03em;
        color: #ffffff;
      }

      .footer-icons {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        color: #ffffff;
      }

      .footer-icon {
        margin-right: 16px;
      }

      .footer-divider {
        border-top: 1px solid #444;
        margin: 12px 0 8px 0;
      }

      .footer-text {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        color: #aaa;
        line-height: 1.6;
        text-align: center;
      }

      .footer-links {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      class="email-wrapper"
    >
      <tr>
        <td align="center">
          <!-- MAIN WRAPPER (max 600px) -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            class="main-table"
          >
            <!-- TOP BLACK BAR WITH LOGO -->
            <tr>
              <td class="header-section">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" class="brand-name">SOW WEAR</td>
                    <td align="right">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- GRADIENT BACKGROUND BLOCK -->
            <tr>
              <td class="gradient-section">
                <!-- WHITE CARD -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  class="white-card"
                >
                  <tr>
                    <td class="card-content">
                      <!-- TITLE -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td align="center" class="title">
                            Yêu cầu thay đổi mật khẩu
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="greeting">
                            Xin chào ${userName},
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="description">
                            Bạn đã yêu cầu đặt lại mật khẩu tài khoản Sow Wear.<br />
                            Nhấn vào liên kết bên dưới để thay đổi mật khẩu của bạn:
                          </td>
                        </tr>
                      </table>

                      <!-- RESET BUTTON -->
                      <table
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        class="button-container"
                      >
                        <tr>
                          <td align="center">
                            <a href="${resetLink}" class="reset-button">
                              Xác nhận thay đổi mật khẩu
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- EXPIRY TEXT -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td align="center" class="expiry-text">
                            Liên kết này sẽ hết hạn trong ${expiryMinutes} phút.
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="warning-text">
                            *Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- END WHITE CARD -->
              </td>
            </tr>

            <!-- BOTTOM BLACK BAR / FOOTER -->
            <tr>
              <td class="footer-section">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" class="footer-brand">SOW WEAR</td>
                    <td align="right" class="footer-icons">
                      <!-- Social Media Links -->
                      <a href="https://www.facebook.com/profile.php?id=61575982741367#" target="_blank" style="text-decoration:none; margin-right:16px; display:inline-block; color:#ffffff; font-size:13px;">
                        Facebook
                      </a>
                      <a href="https://www.instagram.com/sowwearvn" target="_blank" style="text-decoration:none; margin-right:16px; display:inline-block; color:#ffffff; font-size:13px;">
                        Instagram
                      </a>
                      <a href="https://www.threads.net/@sowwearvn?xmt=AQF0v5AaqkPf55Vn2znUiDpQPmysS94Z3UrZksubJdgP1PI" target="_blank" style="text-decoration:none; margin-right:16px; display:inline-block; color:#ffffff; font-size:13px;">
                        Threads
                      </a>
                      <a href="https://www.tiktok.com/@sowwear?_t=ZS-8yeZHU2croe&_r=1" target="_blank" style="text-decoration:none; display:inline-block; color:#ffffff; font-size:13px;">
                        TikTok
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="footer-divider">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="footer-text">
                      Email được gửi tự động từ hệ thống SOWWEAR. Vui lòng không trả lời trực tiếp email này.
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="footer-links">
                      Privacy policy • Terms of service
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
