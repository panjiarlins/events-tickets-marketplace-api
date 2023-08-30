'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      models.Order.belongsTo(models.Event, {
        foreignKey: {
          name: 'eventId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Order.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voucherPointUsage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    referralPointUsage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
