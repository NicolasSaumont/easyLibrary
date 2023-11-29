const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Author extends Model {}

Author.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'author',
  }
);

module.exports = Author;
