const Sequelize = require('sequelize');
const db = require('../config/database');

const AttendanceRecord = db.define('attendanceRecord', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    attendance: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    quizPts: Sequelize.INTEGER
}, { timestamps: true });

module.exports = AttendanceRecord;