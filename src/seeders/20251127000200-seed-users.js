'use strict';

const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [
      {
        id: randomUUID(),
        name: 'Demo User',
        email: 'demo@example.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'demo@example.com' }, {});
  },
};
