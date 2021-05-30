const level = require('level');
const { v4: uuid } = require('uuid');
const logger = require('@greencoast/logger');
const { ResourceNotFoundError, InvalidOrderError } = require('../errors');

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
      await this.db.get(SitesDatabase.KEYS.order);
      return false;
    } catch (error) {
      logger.warn('(DB): Order key in SitesDatabase was not found, creating...');
      await this.db.put(SitesDatabase.KEYS.order, JSON.stringify([]));
      return true;
    }
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const sites = [];
      let error = null;

      this.db.createReadStream()
        .on('data', ({ key, value }) => {
          if (key !== SitesDatabase.KEYS.order) {
            sites.push(JSON.parse(value));
          }
        })
        .on('error', (err) => {
          error = err;
        })
        .on('end', () => {
          if (error) {
            return reject(error);
          }

          resolve(sites);
        });
    });
  }

  async get(id) {
    try {
      return JSON.parse(await this.db.get(`sites:${id}`));
    } catch (error) {
      if (error.name === 'NotFoundError') {
        throw new ResourceNotFoundError(error.message); // Rethrow this error with another instance because our custom errors contain the proper response code in them.
      }

      throw error;
    }
  }

  async create(site) {
    site.id = uuid();

    await this.db.put(`sites:${site.id}`, JSON.stringify(site));
    await this.appendToOrder(site.id);
    logger.debug(`(DB): Site ${site.name} created with id ${site.id}`);

    return site;
  }

  async delete(id) {
    const old = await this.get(id);

    await this.db.del(`sites:${id}`);
    await this.removeFromOrder(id);
    logger.debug(`(DB): Site ${old.name} with id ${old.id} removed from database.`);

    return old;
  }

  async update(id, newSite) {
    const old = await this.get(id);
    const merged = { ...old, ...newSite };

    await this.db.put(id, JSON.stringify(merged));
    logger.debug(`(DB): Site ${old.name} with id ${old.id} has been updated.`);

    return merged;
  }

  async getOrder() {
    return JSON.parse(await this.db.get(SitesDatabase.KEYS.order));
  }

  async appendToOrder(id) {
    const order = await this.getOrder();
    return this.updateOrder([...order, id]);
  }

  async removeFromOrder(id) {
    const order = await this.getOrder();
    return this.updateOrder(order.filter((x) => x !== id));
  }

  updateOrder(newOrder) {
    logger.debug('(DB): Order has been updated.');
    return this.db.put(SitesDatabase.KEYS.order, JSON.stringify(newOrder));
  }

  async updateOrderExpensive(newOrder) {
    const all = await this.getOrder();

    if (all.length !== newOrder.length) {
      throw new InvalidOrderError('New order size must be the same as the current number of sites!');
    }

    for (const id of newOrder) {
      if (!all.includes(id)) {
        throw new InvalidOrderError('New order must contain all sites!');
      }
    }

    await this.updateOrder(newOrder);
    return newOrder;
  }
}

SitesDatabase.KEYS = {
  order: 'sites:order'
};

module.exports = SitesDatabase;
