'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    gender: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    age_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};