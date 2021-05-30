const express = require('express');
const bodyParser = require('body-parser');
const Response = require('../classes/Response');
const { InvalidBodyError } = require('../errors');
const { onlySupportedMethods } = require('../middleware');
const { validateWithSchema } = require('../schemas/utils');
const { SiteCreateSchema, SiteUpdateSchema } = require('../schemas/Site');
const { sitesDB } = require('../db');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  return sitesDB.getAll()
    .then((sites) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(sites));
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { body } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(Response.DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  const site = validateWithSchema(body, SiteCreateSchema);

  return sitesDB.create(site)
    .then((created) => {
      const response = new Response(Response.CODES.CREATED);
      return res.status(response.code).send(response.create(created));
    })
    .catch(next);
});

router.all('/', onlySupportedMethods(['GET', 'POST']));

router.get('/order', (req, res, next) => {
  return sitesDB.getOrder()
    .then((order) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(order));
    })
    .catch(next);
});

router.put('/order', (req, res, next) => {
  const { body } = req;

  if (!body) {
    throw new InvalidBodyError(Response.DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  return sitesDB.updateOrderExpensive(body)
    .then((updated) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(updated));
    })
    .catch(next);
});

router.all('/order', onlySupportedMethods(['GET', 'PUT']));

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  return sitesDB.get(id)
    .then((sites) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(sites));
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  return sitesDB.delete(id)
    .then((deleted) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(deleted));
    })
    .catch(next);
});

router.patch('/:id', (req, res, next) => {
  const { body, params: { id } } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(Response.DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  const newSite = validateWithSchema(body, SiteUpdateSchema);

  return sitesDB.update(id, newSite)
    .then((updated) => {
      const response = new Response(Response.CODES.OK);
      return res.status(response.code).send(response.create(updated));
    })
    .catch(next);
});

router.all('/:id', onlySupportedMethods(['GET', 'DELETE', 'PATCH']));

module.exports = router;
