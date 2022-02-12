// Set up the database with proper tables and NFL data

import logger from '../utilities/logger';

import User from '../features/user/user.model';

async function InitDB() {
  logger.info('Initializing the database');
  await User.sync({ force: true });
}

export default InitDB;
