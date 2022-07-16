'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review belongs to Image (* to 1)
      Review.belongsTo(models.Image, {
        foreignKey: 'imageableId'
      });

      // Review belongs to Spot (* to 1)
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
      // Review belongs to User (* to 1)
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Review.init({
    review: DataTypes.STRING(255),
    stars: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};