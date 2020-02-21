'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    age_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  pet.associate = function (models) {
    pet.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user"

    });
    pet.belongsTo(models.species, {
      foreignKey: "species_id",
      as: "species"
    });
    pet.belongsTo(models.age, {
      foreignKey: "age_id",
      as: "ages"
    });
  };
  return pet;
};