const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Discount = sequelize.define(
  "Discount",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },

    type: {
      type: DataTypes.ENUM("PUBLIC", "UNIQUE", "ONE_TIME"),
      allowNull: false,
      comment: "Loại mã: dùng chung / unique cho user / 1 lần",
    },

    apply_type: {
      type: DataTypes.ENUM("PRODUCT", "SHIPPING", "CATEGORIES", "ALL"),
      allowNull: false,
      comment: "Loại áp dụng: sản phẩm hoặc phí ship",
    },

    discount_type: {
      type: DataTypes.ENUM("PERCENT", "FIXED"),
      allowNull: false,
      comment: "Kiểu giảm: % hoặc số tiền cố định",
    },

    discount_value: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      comment: "Giá trị giảm",
    },

    max_discount_cap: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: "Mức giảm tối đa (chỉ dùng khi discount_type = PERCENT)",
    },

    min_order_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: "Giá trị đơn hàng tối thiểu để áp dụng",
    },

    usage_limit_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "Số lần sử dụng tổng cộng",
    },

    usage_limit_per_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Giới hạn số lần sử dụng cho 1 user",
    },

    stacking_with_shipping: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Cho phép cộng với mã giảm phí ship",
    },

    stacking_with_product: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Cho phép cộng với mã giảm sản phẩm",
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Ngày bắt đầu hiệu lực",
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Ngày kết thúc hiệu lực",
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "PAUSED", "CANCEL"),
      defaultValue: "ACTIVE",
      allowNull: false,
      comment: "Trạng thái: Active / Paused / Cancel",
    },

    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    is_scan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Cron đã quét bản ghi này hay chưa",
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
    tableName: "discounts",
    timestamps: true,
    underscored: true,
    paranoid: true, // soft delete
    deletedAt: "deleted_at",
  }
);

// ---------------- RELATIONS ----------------
Discount.associate = (models) => {
  // 1 discount có nhiều scope
  if (models.DiscountScope) {
    Discount.hasMany(models.DiscountScope, {
      foreignKey: "discount_id",
      as: "scopes",
      onDelete: "CASCADE",
    });
  }

  // 1 discount có nhiều allocation
  if (models.DiscountAllocation) {
    Discount.hasMany(models.DiscountAllocation, {
      foreignKey: "discount_id",
      as: "allocations",
      onDelete: "CASCADE",
    });
  }

  // 1 discount có thể liên kết với nhiều referral
  if (models.ReferralReferrals) {
    Discount.hasMany(models.ReferralReferrals, {
      foreignKey: "discount_id", // ✅ KHÔNG phải referral_discount_id
      as: "referrals",
      onDelete: "CASCADE",
    });
  }
};

module.exports = Discount;
