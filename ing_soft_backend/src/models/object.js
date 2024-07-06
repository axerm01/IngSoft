const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Object = sequelize.define('object', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

module.exports = Object;
