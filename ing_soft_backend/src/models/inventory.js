const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Game = require('./game');

const Inventory = sequelize.define('inventory', {}, {});

Inventory.belongsTo(User, { as: 'player' });
Inventory.belongsTo(Game, { as: 'game' });
Inventory.belongsToMany(require('./object'), { as: 'content', through: 'InventoryObjects' });

Inventory.prototype.removeObject = function() {
  // implementa la logica per rimuovere un oggetto qui
};

Inventory.prototype.addObject = function() {
  // implementa la logica per aggiungere un oggetto qui
};

Inventory.prototype.checkObject = function() {
  // implementa la logica per controllare un oggetto qui
};

module.exports = Inventory;
