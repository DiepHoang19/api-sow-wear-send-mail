const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // your Gmail address
    pass: process.env.MAIL_PASS, // NOT your Gmail login password
  },
});

async function sendMailService({ to, subject, text, html }) {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM, //  gửi từ email nào
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send email");
  }
}

module.exports = sendMailService;
