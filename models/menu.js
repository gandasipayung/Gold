'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Menu extends Model{

  }

  Menu.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    img : DataTypes.STRING
  }, {
    sequelize
  })

  Menu.associate = function(models) {
    // associatitoons can be defined here
    Menu.hasMany(models.Order)
    // Menu.belongsToMany(models.Order, { through: models.OrderDetail})
  };
  return Menu;
};