'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  

  class Order extends Model{
    
  }

  Order.init({
    date: DataTypes.DATE,
    CustomerId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize
  })
  
  Order.associate = function(models) {
    // associations can be defined here
    // Order.belongsTo(models.Customer)
    Order.belongsTo(models.Customer)
    Order.belongsTo(models.Menu)
    // Order.belongsToMany(models.Menu, { through: models.OrderDetail})
  };
  return Order;
};