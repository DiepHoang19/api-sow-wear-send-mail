const nodemailer = require("nodemailer");
const { Seller, User, SellerAddress } = require("../models/index"); // import models

async function sendOtpVerify({ email, otp }) {
  console.log("🚀 ~ sendOtpVerify ~ email:", email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wearsow99@gmail.com",
      pass: "gopp pcll xpcb lwno",
    },
  });

  const mailOptions = {
    from: "wearsow99@gmail.com",
    to: email,
    subject: "Xác thực tài khoản",
    text: `Mã OTP của bạn là: ${otp}`,
  };
  console.log("🚀 ~ sendOtpVerify ~ mailOptions:", mailOptions);

  return transporter.sendMail(mailOptions);
}

// api SellerAddress
async function createSellerAddress(createSellerAddressDto, user_id) {
  const {
    name,
    provinceId,
    wardId,
    isMainAddress,
    address,
    absoluteAddress,
    phoneNumber,
  } = createSellerAddressDto;

  try {
    // Tìm seller hiện tại theo userId
    let seller = await Seller.findOne({
      where: { user_id: user_id },
      include: {
        model: User,
        as: "user",
        attributes: ["email"],
      },
    });

    console.log("seller", seller);

    // Nếu chưa có seller => tạo mới
    if (!seller) {
      const sellerNew = await Seller.create({
        user_id: user_id,
        name,
        address,
      });
      console.log("🚀 ~ createSellerAddress ~ sellerNew:", sellerNew);

      // Lấy lại seller có user đi kèm
      const sellerWithUser = await Seller.findOne({
        where: { id: sellerNew.id },
        include: {
          model: User,
          as: "user",
          attributes: ["email"],
        },
      });
      console.log("🚀 ~ createSellerAddress ~ sellerWithUser:", sellerWithUser);

      if (sellerWithUser && sellerWithUser?.user?.email) {
        console.log(
          "🚀 ~ createSellerAddress ~ sellerWithUser?.user?.email:",
          sellerWithUser?.user?.email
        );
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Seller.update(
          { otp, time_otp: new Date(Date.now() + 5 * 60 * 1000) },
          { where: { id: sellerNew.id } }
        );

        const data = await sendOtpVerify({
          email: sellerWithUser.user.email,
          otp,
        });

        if (!data.messageId) {
          return {
            success: false,
            message: "Gửi mail thất bại, vui lòng thử lại sau.",
          };
        }
      }

      const sellerAddressCreated = await SellerAddress.create({
        ...createSellerAddressDto,
        seller_id: sellerNew.id,
        province_id: provinceId,
        ward_id: wardId,
        absolute_address: absoluteAddress,
        phone_number: phoneNumber,
        is_main_address: isMainAddress,
      });

      return sellerAddressCreated;
    }

    // Nếu seller đã tồn tại
    const sellerAddress = await SellerAddress.findOne({
      where: { seller_id: seller.id, is_main_address: true },
    });

    if (sellerAddress && isMainAddress) {
      await SellerAddress.update(
        { is_main_address: false },
        { where: { id: sellerAddress.id } }
      );
    }

    const sellerAddressCreated = await SellerAddress.create({
      ...createSellerAddressDto,
      seller_id: seller.id,
    });

    return sellerAddressCreated;
  } catch (error) {
    throw error;
  }
}

module.exports = { createSellerAddress };
