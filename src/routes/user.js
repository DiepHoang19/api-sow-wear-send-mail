const express = require("express");
const router = express.Router();
const UserService = require("../service/user");

router.post("/register", async (req, res) => {
  try {
    const { email, password, userType, profile } = req.body;

    const result = await UserService.registerUser({
      email,
      password,
      userType,
      profile,
    });

    res.json({
      success: true,
      message: "Đăng ký thành công, vui lòng kiểm tra email để xác minh",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;
    await UserService.verifyUser(token);

    return res.redirect("https://sowwear.com/login?verified=success");
  } catch (err) {
    console.error(err);
    return res.redirect("https://sowwear.com/login?verified=failed");
  }
});

router.get("/forgot-password", async (req, res) => {
  try {
    const { email } = req.query;

    // 1️⃣ Kiểm tra email
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email hợp lệ.",
      });
    }

    // 2️⃣ Gửi email đặt lại mật khẩu
    const result = await UserService.sendEmailChangePassword(email);

    // 3️⃣ Xử lý phản hồi từ service
    if (result.success) {
      return res.status(200).json({
        success: true,
        message:
          "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Không thể gửi email đặt lại mật khẩu.",
      });
    }
  } catch (err) {
    console.error("❌ Lỗi khi xử lý forgot-password:", err);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.",
    });
  }
});

module.exports = router;
