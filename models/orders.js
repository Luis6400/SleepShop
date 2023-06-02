const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class orders extends Model {}

orders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date_ordered: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orders',
    }
);

module.exports = orders;
