const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class sleep_data extends Model {}

sleep_data.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        sleep_start: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        sleep_end: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        still_sleeping: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        points_earned: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        modelName: 'sleep_data',
    }
    );

module.exports = sleep_data;