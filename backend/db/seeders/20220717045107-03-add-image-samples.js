'use strict';

const { Image, Spot } = require('../models');

const images = [
  {
    url: "image url"
  }
];

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
    for (let imageInfo of images) {
      const {
        url
      } = imageInfo;

      const spot = await Spot.findOne();

      await Image.create({
        imageableId: spot.id,
        url
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images');
  }
};
