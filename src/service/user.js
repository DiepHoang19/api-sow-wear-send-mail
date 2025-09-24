const User = require("../models/user");
const UserProfile = require("../models/user-profile");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wearsow99@gmail.com",
    pass: "gopp pcll xpcb lwno",
  },
});

class UserService {
  static async registerUser({ email, password, userType, profile }) {
    const { username, fullname, intro, phoneNumber, avatar } = profile;
    // check email
    const existingUser = await User.findOne({
      where: { email, deleted_at: null },
    });

    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    // tạo token verify
    const tokenVerify = crypto.randomBytes(32).toString("hex");

    // tạo user
    const user = await User.create({
      email,
      password,
      user_type: userType || 2,
      token_verify: tokenVerify,
    });

    // Tạo profile user
    const userProfile = await UserProfile.create({
      user_id: user.id,
      username,
      fullname,
      intro,
      phoneNumber,
      avatar,
    });

    // gửi mail verify
    const verifyLink = `https://api.sowwear.com/users/verify-account?token=${tokenVerify}`;

    await transporter.sendMail({
      from: '"Sowwear" <no-reply@sowwear.com>',
      to: email,
      subject: "Xác minh tài khoản Sowwear",
      html: `<p>Xin chào ${profile?.fullname || profile?.username || "bạn"},</p>
             <p>Nhấn vào link sau để xác minh tài khoản:</p>
             <a href="${verifyLink}">${verifyLink}</a>`,
    });

    return {
      id: user.id,
      email: user.email,
      userProfile,
    };
  }

  static async verifyUser(token) {
    const user = await User.findOne({ where: { token_verify: token } });
    if (!user) {
      throw new Error("Token không hợp lệ hoặc đã được dùng");
    }

    user.verify = true;
    user.token_verify = null;
    await user.save();

    return user;
  }
}

module.exports = UserService;
