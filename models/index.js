const sleep_data = require('./sleep_data');
const User = require('./users')
const Product = require('./products')
const sequelize = require('../config/connection');

User.hasMany(sleep_data, {
    foreignKey: 'user_id'
});

sleep_data.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tables synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error);
  });

module.exports = { User, sleep_data, Product };
