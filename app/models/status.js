const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Status extends Model {}

Status.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'status',
  }
);

module.exports = Status;
