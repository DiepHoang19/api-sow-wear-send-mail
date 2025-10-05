const User = require("./user");
const Seller = require("./seller");
const SellerAddress = require("./seller-address");
const UserProfile = require("./user-profile");
const ReferralReferrals = require("./referral_referrals");
const ReferralCode = require("./referral_code");
const Discount = require("./discount");

// Gom models vào object
const models = {
  User,
  Seller,
  SellerAddress,
  UserProfile,
  ReferralReferrals,
  ReferralCode,
  Discount,
};

// Gọi associate cho từng model nếu có
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
