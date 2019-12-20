'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Customer extends Model{

  }

  Customer.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    MembershipId: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate : (instance) =>{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        
        instance.password = hash
      }
    }
  })
  
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsTo(models.Membership)
    Customer.hasMany(models.Order)
  };
  return Customer;
};