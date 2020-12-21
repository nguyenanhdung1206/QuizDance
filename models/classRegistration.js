const Sequelize = require('sequelize');
const db = require('../config/database');

const ClassRegistration = db.define('classRegistration', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: false });

module.exports = ClassRegistration;
