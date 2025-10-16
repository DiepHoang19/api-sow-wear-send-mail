const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
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

// POST /send-mail
router.post("/", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: to, subject",
      });
    }

    await sendMailService({ to, subject, text, html });

    return res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Send mail error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to send email",
    });
  }
});

module.exports = router;
