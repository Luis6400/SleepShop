const sleep_data = require('./sleep_data');
const User = require('./users')
const Product = require('./products')

User.hasMany(sleep_data, {
    foreignKey: 'user_id'
});

sleep_data.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = { User, sleep_data, Product };
