const Sequelize = require('sequelize');
const db = require('../config/database');

const Question = db.define('question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    answers: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false
    },
    countdown: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
}, { timestamps: false });

module.exports = Question;
