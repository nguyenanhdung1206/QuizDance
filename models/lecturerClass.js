const Sequelize = require('sequelize');
const db = require('../config/database');

const LecturerClass = db.define('lecturerClass', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    classType: Sequelize.STRING,
    room: Sequelize.STRING,
    weekDay: Sequelize.STRING,
    periodStart: Sequelize.INTEGER,
    periodEnd: Sequelize.INTEGER
}, { timestamp: false });

module.exports = LecturerClass;
