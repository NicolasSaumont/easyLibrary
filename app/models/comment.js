const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Comment extends Model {}

Comment.init({
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "comment",
});

module.exports = Comment;