const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ending_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'book',
  }
);

module.exports = Book;
