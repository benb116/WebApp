// Set up example DB records for use in testing

const models = require('../models');
const logger = require('../utilities/logger');
const InitDB = require('./dbinit');

async function PopulateDB(sequelize) {
  await InitDB(sequelize);
  logger.info('Populating DB with initial data');

  const { User } = models;

  // Define Users
  const usrs = ['email1@gmail.com', 'email2@gmail.com', 'email3@gmail.com', 'email4@gmail.com', 'email5@gmail.com', 'email6@gmail.com'];
  // hash is password1
  await User.bulkCreate(usrs.map((u) => ({
    email: u,
    pwHash: '$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq',
    name: 'bot',
    verified: (u !== 'email5@gmail.com' && u !== 'email6@gmail.com'),
  })));

  return models;
}

module.exports = PopulateDB;
