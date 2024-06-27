const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Set = require('./set'); 
const Object = require('./object');
const Riddle = require('./riddle');

const Option = sequelize.define('option', {}, {});

Option.belongsTo(Set, { as: 'nextSet' }); 
Option.belongsTo(Object, { as: 'requiredObject', allowNull: true });
Option.belongsTo(Riddle, { as: 'riddle', allowNull: true });

Option.prototype.addOption = function() {
  // implementa la logica per aggiungere un'opzione qui
};

Option.prototype.modifyText = function() {
  // implementa la logica per modificare il testo qui
};

module.exports = Option;
