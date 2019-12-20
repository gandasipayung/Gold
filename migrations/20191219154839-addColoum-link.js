'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Menus', 'img', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Menus', 'img')
  }
};
