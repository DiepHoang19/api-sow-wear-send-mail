const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    is_register_email: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    token_verify: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    token_refetch_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    following_count: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    followers_count: {
      type: DataTypes.BIGINT,
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
    tableName: "users",
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

// Hook hash password trước khi create
User.beforeCreate(async (user, options) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.associate = (models) => {
  User.hasMany(models.Seller, { foreignKey: "user_id", as: "sellers" });
};

module.exports = User;
