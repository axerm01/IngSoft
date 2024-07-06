const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Story = sequelize.define('story', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {});

Story.belongsTo(User, { as: 'author' });
Story.hasMany(require('./set'), { as: 'sets' });

Story.prototype.addSet = function() { 
  // implementa la logica per aggiungere uno scenario qui
};

Story.prototype.deleteStory = function() {
  // implementa la logica per eliminare una storia qui
};

module.exports = Story;
