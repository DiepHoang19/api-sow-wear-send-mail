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

  static async sendEmailChangePassword(email) {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("Không tìm thấy tài khoản trong hệ thống.");
    }

    // 2️⃣ Tạo token (mã hóa base64)
    const hashEmail = Buffer.from(email).toString("base64");

    // 3️⃣ Cập nhật token vào DB
    user.token_refetch_password = hashEmail;
    await user.save();

    // 4️⃣ Cấu hình gửi email
    await transporter.sendMail({
      from: '"Sowwear" <no-reply@sowwear.com>',
      to: email,
      subject: "Yêu cầu thay đổi mật khẩu",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Xin chào ${user.fullname || user.username || "bạn"},</h2>
            <p>Bạn đã yêu cầu đặt lại mật khẩu tài khoản Sowwear.</p>
            <p>Nhấn vào liên kết bên dưới để thay đổi mật khẩu của bạn:</p>
            <a href="https://sowwear.com/login?token=${hashEmail}"
               style="display: inline-block; background-color: #007bff; color: white;
                      padding: 10px 20px; border-radius: 5px; text-decoration: none;">
              Xác nhận thay đổi mật khẩu
            </a>
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
            <hr />
            <p style="font-size: 12px; color: #999;">Liên kết này sẽ hết hạn trong 1 giờ.</p>
          </div>
        `,
    });

    return {
      success: true,
      message: "Email đặt lại mật khẩu đã được gửi thành công.",
    };
  }
}

module.exports = UserService;
