const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReferralReferrals = sequelize.define(
  "ReferralReferrals",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    referral_code_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "Mã giới thiệu liên kết (referral_codes.id)",
    },

    referrer_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "Người giới thiệu (users.id)",
    },

    invitee_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "Người được giới thiệu (users.id)",
    },

    referral_click_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Số lượt đã click (nếu có liên kết tới referral_clicks)",
    },

    registered_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Ngày đăng ký thành công",
    },

    first_order_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "ID đơn hàng đầu tiên",
    },

    first_order_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Ngày đặt đơn hàng đầu tiên",
    },

    disqualified_reason: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Lý do không được nhận quà",
    },

    referrer_reward_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      comment: "Trạng thái phần thưởng cho người giới thiệu",
    },

    invitee_reward_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      comment: "Trạng thái phần thưởng cho người được giới thiệu",
    },

    discount_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Id quà tặng (discounts.id)",
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
    tableName: "referral_referrals",
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

// ---------------- RELATIONS ----------------
ReferralReferrals.associate = (models) => {
  // referral_code_id → ReferralCode
  ReferralReferrals.belongsTo(models.ReferralCode, {
    foreignKey: "referral_code_id",
    as: "referral_code",
    onDelete: "CASCADE",
  });

  // referrer_user_id → User
  ReferralReferrals.belongsTo(models.User, {
    foreignKey: "referrer_user_id",
    as: "referrer_user",
  });

  // invitee_user_id → User
  ReferralReferrals.belongsTo(models.User, {
    foreignKey: "invitee_user_id",
    as: "invitee_user",
  });

  // discount_id → Discount
  ReferralReferrals.belongsTo(models.Discount, {
    foreignKey: "discount_id",
    as: "referral_discount",
  });
};

module.exports = ReferralReferrals;
