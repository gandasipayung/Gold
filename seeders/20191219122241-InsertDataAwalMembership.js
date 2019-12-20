'use strict';
const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./seedFiles/Membership.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', file);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Memberships', null, {});
  }
};

