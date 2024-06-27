const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Story = require('./story');
const Set = require('./set'); 
const Inventory = require('./inventory');

const Game = sequelize.define('game', {}, {});

Game.belongsTo(User, { as: 'player' });
Game.belongsTo(Story, { as: 'story' });
Game.belongsTo(Set, { as: 'currentSet' }); 
Game.belongsTo(Inventory, { as: 'inventory' });

Game.prototype.loadGame = function() {
  // implementa la logica per caricare una partita qui
};

Game.prototype.deleteGame = function() {
  // implementa la logica per eliminare una partita qui
};

Game.prototype.saveGame = function() {
  // implementa la logica per salvare una partita qui
};

Game.prototype.removeGame = function() {
  // implementa la logica per rimuovere una partita qui
};

module.exports = Game;
