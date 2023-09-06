'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Review.belongsTo(models.Order, {
        foreignKey: {
          name: 'orderId',
          primaryKey: true,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Review.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  Review.removeAttribute('id');

  return Review;
};
