'use strict';

// Import Spot
const { Spot } = require('../models');

// Spots sample
const spots = [
  {
    id: 1,
    ownerId: 1,
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: 37.7645358,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123,
    locationType: 'Stays',
    previewImage: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
  },
  {
    id: 2,
    ownerId: 2,
    address: 'P.O. Box 1303',
    city: 'Charlotte',
    state: 'North Carolina',
    country: 'United States of America',
    lat: 120.2310045,
    lng: -50.2341234,
    name: 'Internal Revenue Services',
    description: "World's most efficient tax administrators",
    price: 500,
    locationType: 'Stays',
    previewImage: "https://federalnewsnetwork.com/wp-content/uploads/2018/04/IRS_Online_Payment_Glitch_88663.jpg"
  },
  {
    id: 3,
    ownerId: 1,
    address: '1313 Disneyland Dr',
    city: 'Anaheim',
    state: 'California',
    country: 'United States of America',
    lat: 33.812511,
    lng: -117.918976,
    name: 'Disneyland Park',
    description: "First Theme Park opend by The Walt Disney Company",
    price: 76,
    locationType: 'Experiences',
    previewImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/attractions/disneyland/sleeping-beauty-castle-walkthrough/sleeping-beauty-castle-exterior-16x9.jpg"
  },
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
    for (let spotInfo of spots) {
      const {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        locationType,
        previewImage
      } = spotInfo;

      // get ownerId
      // const ownerId = spots.findIndex(spot => spot === spotInfo) + 1

      await Spot.create({
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        locationType,
        previewImage
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
    await queryInterface.bulkDelete('Spots');
  }
};
