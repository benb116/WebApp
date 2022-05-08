// Set up example DB records for use in testing
import logger from '../utilities/logger';

import User from '../features/user/user.model';

async function PopulateDB() {
  logger.info('Populating DB with initial data');

  // Define Users
  const usrs = [
    'email1@gmail.com',
    'email2@gmail.com',
    'email3@gmail.com',
    'email4@gmail.com',
    'email5@gmail.com',
    'email6@gmail.com',
  ];
  // hash is password1
  const userRecords = usrs.map((u) => ({
    email: u,
    pwHash: '$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq',
    name: 'bot',
    verified: (u !== 'email5@gmail.com' && u !== 'email6@gmail.com'),
  }));
  await User.bulkCreate(userRecords);
}

export default PopulateDB;
