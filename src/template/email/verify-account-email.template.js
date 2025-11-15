/**
 * Verify Account Email Template
 * Template for sending account verification emails
 */

export const VERIFY_ACCOUNT_EMAIL_SUBJECT = "Xác minh tài khoản - SOW WEAR";

export const VERIFY_ACCOUNT_EMAIL_TEXT = (
  userName,
  verificationLink,
  expiryMinutes
) =>
  `Xin chào ${userName}, cảm ơn bạn đã đăng ký! Để hoàn tất quá trình tạo tài khoản, vui lòng xác minh email của bạn bằng cách truy cập: ${verificationLink}. Liên kết này sẽ hết hạn sau ${expiryMinutes} phút.`;

export const VERIFY_ACCOUNT_EMAIL_HTML = (
  userName,
  verificationLink,
  expiryMinutes
) => `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Xác minh tài khoản</title>
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

      .success-message {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
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

      .verify-button {
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

      .alternative-text {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #666;
        line-height: 1.6;
        padding: 0 0 20px 0;
      }

      .verification-link {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #fff;
        line-height: 1.6;
        padding: 0 0 20px 0;
        word-break: break-all;
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
        color: #ef4444;
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
                            Xác minh tài khoản
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="greeting">
                            Xin chào ${userName},
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="success-message">
                            Cảm ơn bạn đã đăng ký!
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="description">
                            Để hoàn tất quá trình tạo tài khoản và kích hoạt quyền truy cập, vui lòng xác minh email của bạn bằng cách nhấn vào nút bên dưới.
                          </td>
                        </tr>
                      </table>

                      <!-- VERIFY BUTTON -->
                      <table
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        class="button-container"
                      >
                        <tr>
                          <td align="center">
                            <a href="${verificationLink}" class="verify-button">
                              Xác minh email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- ALTERNATIVE METHOD -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td align="center" class="alternative-text">
                            Nếu nút trên không hoạt động, bạn có thể sử dụng liên kết sau:
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="verification-link">
                            <a href="${verificationLink}" style="color: #fff; text-decoration: underline;">
                              ${verificationLink}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="expiry-text">
                            Vì lý do bảo mật, liên kết này sẽ hết hạn sau ${expiryMinutes} phút.
                          </td>
                        </tr>
                        <tr>
                          <td align="center" class="warning-text">
                            *Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua email này.
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
