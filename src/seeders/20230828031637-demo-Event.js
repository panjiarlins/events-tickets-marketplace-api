'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   title: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Events', [{
      id: 1,
      title: 'Tawakal',
      imageUrl: 'https://comika.id/wp-content/uploads/2023/08/COVER-taakal-600x600.png',
      city: 'Jakarta',
      address: 'Jakarta',
      description: 'Event rame-rame',
      price: 250000,
      stock: 100,
      startAt: '2023-08-26',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    }, {
      id: 2,
      title: 'Tetta',
      imageUrl: 'https://comika.id/wp-content/uploads/2023/08/Tetta-Cover-600x600.png',
      city: 'Batam',
      address: 'Batam',
      description: 'Event di Batam',
      price: 300000,
      stock: 150,
      startAt: '2023-08-25',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    }, {
      id: 3,
      title: 'Si Paling Hijrah',
      imageUrl: 'https://comika.id/wp-content/uploads/2023/08/si-paling-hijrah-cover-600x600.jpg',
      city: 'Bandung',
      address: 'Bandung',
      description: 'Event di Bandung',
      price: 75000,
      stock: 300,
      startAt: '2023-08-28',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
