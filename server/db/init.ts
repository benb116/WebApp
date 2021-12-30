// Set up the database with proper tables

import logger from '../utilities/logger';

import sequelize from '.';

async function InitDB() {
  logger.info('Initializing the database');
  await sequelize.sync({ force: true });
}

export default InitDB;
