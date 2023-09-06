'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReferralAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //   define association here
      models.ReferralAction.belongsTo(models.User, {
        foreignKey: {
          name: 'referrerUserId',
          primaryKey: true,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      models.ReferralAction.belongsTo(models.User, {
        foreignKey: {
          name: 'referredUserId',
          primaryKey: true,
          unique: 'referredUserId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  ReferralAction.init(
    {},
    {
      sequelize,
      modelName: 'ReferralAction',
    }
  );

  ReferralAction.removeAttribute('id');

  return ReferralAction;
};
