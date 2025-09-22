const User = require("./user");
const Seller = require("./seller");
const SellerAddress = require("./seller-address");
const UserProfile = require("./user-profile");

// Gom models vào object
const models = { User, Seller, SellerAddress, UserProfile };

// Gọi associate cho từng model nếu có
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
