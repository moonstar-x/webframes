const logger = require('@greencoast/logger');
const SitesDatabase = require('../classes/SitesDatabase');
const { DATA_FOLDER } = require('../constants');

const sitesDB = new SitesDatabase(DATA_FOLDER);
sitesDB.init()
  .then(() => {
    logger.info('SitesDatabase has been loaded.');
  })
  .catch((error) => {
    logger.fatal('Something happened when loading the database.', error);
  });

process.on('exit', async() => {
  logger.info('Exit signal received, gracefully closing database...');
  await sitesDB.destroy();
});

module.exports = {
  sitesDB
};
