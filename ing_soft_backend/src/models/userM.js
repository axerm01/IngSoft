const mongoose = require('mongoose');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true 
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
