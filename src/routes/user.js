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
    const user = await UserService.verifyUser(token);

    return res.redirect("https://sowwear.com/login?verified=success");
  } catch (err) {
    console.error(err);
    return res.redirect("https://sowwear.com/login?verified=failed");
  }
});

module.exports = router;
