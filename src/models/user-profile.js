const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "user_profiles",
    timestamps: false,
    underscored: true, // map cột theo snake_case
  }
);

// Associations
UserProfile.associate = (models) => {
  UserProfile.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = UserProfile;
