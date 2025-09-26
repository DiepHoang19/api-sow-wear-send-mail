const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Seller = sequelize.define(
  "Seller",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users", // bảng users
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    time_otp: {
      type: DataTypes.DATE,
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
    tableName: "sellers",
    timestamps: true,
    underscored: true,
    paranoid: true, // dùng cột deleted_at
    deletedAt: "deleted_at",
  }
);

Seller.associate = (models) => {
  Seller.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
};

module.exports = Seller;
