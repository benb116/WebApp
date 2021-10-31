// Set up the database with proper tables and required data

const models = require('../models');
const logger = require('../utilities/logger');

async function InitDB(sequelize) {
  logger.info('Initializing the database');
  await sequelize.sync({ force: true });

  // Sequelize code

  return models;
}

module.exports = InitDB;
