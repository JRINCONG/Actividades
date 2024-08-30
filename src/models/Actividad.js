const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actividad = sequelize.define('actividade', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateInicial: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateFinal: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Actividad;