'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Voucher.hasMany(models.Order, {
        foreignKey: {
          name: 'voucherCode',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      models.Voucher.belongsToMany(models.Event, {
        through: models.EventVoucher,
        foreignKey: {
          name: 'voucherCode',
          primaryKey: true,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Voucher.init(
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      point: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Voucher',
    },
  );

  return Voucher;
};
