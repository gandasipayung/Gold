'use strict';
const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./seedFiles/Customer.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', file);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};