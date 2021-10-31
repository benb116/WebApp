// Set up models with associations
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const muser = require('./features/user/user.model');

const User = muser(sequelize, DataTypes);

module.exports = { User };

module.exports.sequelize = sequelize;
