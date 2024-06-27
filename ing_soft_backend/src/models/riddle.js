const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Riddle = sequelize.define('riddle', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

Riddle.prototype.verifyAnswer = function() {
  // implementa la logica per verificare la risposta qui
};

module.exports = Riddle;
