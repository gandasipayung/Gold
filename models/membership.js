'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Membership extends Model{

  }

  Membership.init({
    name: DataTypes.STRING,
    disc: DataTypes.FLOAT
  }, {
    sequelize
  })
 
  Membership.associate = function(models) {
    // associations can be defined here
    Membership.hasMany(models.Customer)
  };
  return Membership;
};