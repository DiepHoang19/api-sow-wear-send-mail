const express = require("express");
const router = express.Router();
const { sendMailService } = require("../service/index");

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
