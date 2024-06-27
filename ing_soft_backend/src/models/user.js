const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

User.prototype.register = function() {
  // implementa la logica di registrazione qui
};

User.prototype.login = function() {
  // implementa la logica di login qui
};

User.prototype.logout = function() {
  // implementa la logica di logout qui
};

module.exports = User;
