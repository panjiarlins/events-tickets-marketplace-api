'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Referral.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          primaryKey: true,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Referral.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'code',
    },
    point: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Referral',
  });

  Referral.removeAttribute('id');

  return Referral;
};
