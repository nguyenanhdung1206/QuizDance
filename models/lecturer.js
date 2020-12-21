const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Student = require('../models/student');

const Lecturer = sequelize.define('lecturer', {
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
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING
}, { timestamps: false });

module.exports = Lecturer;