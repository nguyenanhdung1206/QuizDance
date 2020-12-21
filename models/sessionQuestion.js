const Sequelize = require('sequelize');
const db = require('../config/database');

const SessionQuestion = db.define('sessionQuestion', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: false });

module.exports = SessionQuestion;
