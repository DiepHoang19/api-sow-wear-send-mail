const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReferralCode = sequelize.define(
  "ReferralCode",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    referrer_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      comment: "user_id của người tạo mã giới thiệu",
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "Mã giới thiệu duy nhất",
    },

    status: {
      type: DataTypes.ENUM("active", "paused", "revoked"),
      allowNull: false,
      defaultValue: "active",
      comment: "Trạng thái mã giới thiệu",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
    },

    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "referral_codes",
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

// ---------------- RELATIONS ----------------
ReferralCode.associate = (models) => {
  // 1. Mỗi mã giới thiệu thuộc về 1 user (người tạo mã)
  if (models.User) {
    ReferralCode.belongsTo(models.User, {
      foreignKey: "referrer_user_id",
      as: "referrer",
      onDelete: "CASCADE",
    });
  }

  // 2. Mỗi mã giới thiệu có nhiều lượt giới thiệu
  if (models.ReferralReferrals) {
    ReferralCode.hasMany(models.ReferralReferrals, {
      foreignKey: "referral_code_id",
      as: "referrals",
      onDelete: "CASCADE",
    });
  }

  // 3. Mỗi mã giới thiệu có nhiều lượt click
  if (models.ReferralClick) {
    ReferralCode.hasMany(models.ReferralClick, {
      foreignKey: "referral_code_id",
      as: "clicks",
      onDelete: "CASCADE",
    });
  }
};

module.exports = ReferralCode;
