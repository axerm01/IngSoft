const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Story = require('./story');
const Option = require('./option');
const Object = require('./object');

const Set = sequelize.define('set', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {});

Set.belongsTo(Story);
Set.hasMany(Option, { as: 'options' });
Set.belongsTo(Object, { as: 'object' });

Set.prototype.addOption = function() {
  // implementa la logica per aggiungere un'opzione qui
};

Set.prototype.modifyText = function() {
  // implementa la logica per modificare il testo qui
};

module.exports = Set;
