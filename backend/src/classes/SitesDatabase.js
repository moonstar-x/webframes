const level = require('level');
const { v4: uuid } = require('uuid');
const logger = require('@greencoast/logger');

class SitesDatabase {
  constructor(location) {
    this.location = location;
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      level(this.location, null, async(error, db) => {
        if (error) {
          return reject(error);
        }

        this.db = db;
        await this.initializeOrder();
        resolve(this);
      });
    });
  }

  destroy() {
    if (this.db) {
      return this.db.close();
    }

    return Promise.resolve();
  }

  async initializeOrder() {
    try {
      await this.db.get('sites:order');
      return false;
    } catch (error) {
      logger.warn('(DB): Order key in SitesDatabase was not found, creating...');
      await this.db.put('sites:order', []);
      return true;
    }
  }

  async create(site) {
    site.id = uuid();

    await this.db.put(`sites:${site.id}`, site);
    await this.appendToOrder(site.id);
    logger.debug(`(DB): Site ${site.name} created with id ${site.id}`);

    return site;
  }

  async appendToOrder(id) {
    const order = await this.db.get('sites:order');
    return this.updateOrder([...order, id]);
  }

  async removeFromOrder(id) {
    const order = await this.db.get('sites:order');
    return this.updateOrder(order.filter((x) => x !== id));
  }

  updateOrder(newOrder) {
    logger.debug('(DB): Order keys has been updated.');
    return this.db.put('sites:order', newOrder);
  }
}

module.exports = SitesDatabase;
