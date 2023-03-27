const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repair = db.define('repair', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  date: {
    type: DataTypes.DATE('YYYY-MM-DD'),
    allowNull: false,
  },

  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Repair;
