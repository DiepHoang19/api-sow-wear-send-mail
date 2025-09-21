const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SellerAddress = sequelize.define(
  "SellerAddress",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    province_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ward_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seller_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    is_main_address: {
      type: DataTypes.TINYINT, // có thể dùng DataTypes.BOOLEAN nếu DB hỗ trợ
      allowNull: true,
    },
    absolute_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "seller_address",
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

// Associations
SellerAddress.associate = (models) => {
  SellerAddress.belongsTo(models.Seller, { foreignKey: "seller_id" });
};

module.exports = SellerAddress;
