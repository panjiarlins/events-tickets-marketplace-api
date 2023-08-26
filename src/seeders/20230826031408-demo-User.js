'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      id: '1',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      password: 'password1',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '2',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      password: 'password2',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '3',
      firstName: 'Charlie',
      lastName: 'Williams',
      email: 'charlie.williams@example.com',
      password: 'password3',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '4',
      firstName: 'Dave',
      lastName: 'Brown',
      email: 'dave.brown@example.com',
      password: 'password4',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '5',
      firstName: 'Eve',
      lastName: 'Jones',
      email: 'eve.jones@example.com',
      password: 'password5',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '6',
      firstName: 'Frank',
      lastName: 'Miller',
      email: 'frank.miller@example.com',
      password: 'password6',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '7',
      firstName: 'Grace',
      lastName: 'Davis',
      email: 'grace.davis@example.com',
      password: 'password7',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '8',
      firstName: 'Hannah',
      lastName: 'Garcia',
      email: 'hannah.garcia@example.com',
      password: 'password8',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '9',
      firstName: 'Isaac',
      lastName: 'Rodriguez',
      email: 'isaac.rodriguez@example.com',
      password: 'password9',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    {
      id: '10',
      firstName: 'Jack',
      lastName: 'Wilson',
      email: 'jack.wilson@example.com',
      password: 'password10',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
