const Sequelize = require('sequelize');
const db = require('../config/database');

const Session = db.define('session', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    weekNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entryTimer:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    useQuiz: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Session;
