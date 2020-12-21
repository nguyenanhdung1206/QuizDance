const Sequelize = require('sequelize');
const db = require('../config/database');
const Lecturer = require('../models/lecturer');

const Student = db.define('student', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
}, { timestamps: false });

module.exports = Student;