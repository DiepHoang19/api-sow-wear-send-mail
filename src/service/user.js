const User = require("../models/user");
const Discount = require("../models/discount");
const ReferralCode = require("../models/referral_code");
const ReferralReferrals = require("../models/referral_referrals");
const UserProfile = require("../models/user-profile");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {
  RESET_PASSWORD_EMAIL_HTML,
  RESET_PASSWORD_EMAIL_SUBJECT,
  VERIFY_ACCOUNT_EMAIL_SUBJECT,
} = require("../template/email");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wearsow99@gmail.com",
    pass: "gopp pcll xpcb lwno",
  },
});

function generateRandomCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }

  return result;
}

class UserService {
  static async registerUser({ email, password, userType, profile }) {
    const { username, fullname, intro, phoneNumber, avatar } = profile;
    // check email
    const existingUser = await User.findOne({
      where: { email, deleted_at: null },
    });

    if (existingUser) {
      throw new Error(
        "Email này đã được đăng ký. Bạn có thể đăng nhập để tiếp tục"
      );
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
      subject: VERIFY_ACCOUNT_EMAIL_SUBJECT,
      html: VERIFY_ACCOUNT_EMAIL_HTML(
        profile?.fullname || profile?.username || "bạn",
        verifyLink,
        10
      ),
    });

    const discountId = await Discount.findOne({ deleted_at: null });
    if (user?.id && discountId?.id) {
      const data = await ReferralCode.create({
        referrer_user_id: user.id,
        code: generateRandomCode(),
      });
      if (data?.referrer_user_id) {
        await ReferralReferrals.create({
          // invitee_user_id: null,
          registered_at: new Date(),
          invitee_reward_status: "pending",
          referrer_reward_status: "pending",
          referrer_user_id: data.referrer_user_id,
          discount_id: discountId?.id,
          referral_code_id: data.id,
        });
      }
    }

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
    const resetLink = `https://sowwear.com/change-password?token=${hashEmail}`;

    await user.save();

    // 4️⃣ Cấu hình gửi email
    await transporter.sendMail({
      from: '"Sowwear" <no-reply@sowwear.com>',
      to: email,
      subject: RESET_PASSWORD_EMAIL_SUBJECT,
      html: RESET_PASSWORD_EMAIL_HTML(
        user.fullname || user.username || "bạn",
        resetLink,
        5
      ),
    });

    return {
      success: true,
      message: "Email đặt lại mật khẩu đã được gửi thành công.",
    };
  }
}

module.exports = UserService;
