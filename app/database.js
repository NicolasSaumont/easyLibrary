const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL,{
    logging: false,
    define: {
      underscored:true,
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    }
});

module.exports = sequelize;