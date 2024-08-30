const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Item = sequelize.define('item', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Item;