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
