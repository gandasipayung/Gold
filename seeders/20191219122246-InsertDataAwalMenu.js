'use strict';
const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./seedFiles/Menu.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Menus', file);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
