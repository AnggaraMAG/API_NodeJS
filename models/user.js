'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin'),
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    user.hasMany(models.pet, { foreignKey: "user_id" })
    user.hasOne(models.payment, { foreignKey: "user_id", as: "user" })
  };
  return user;
};