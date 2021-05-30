const express = require('express');
const bodyParser = require('body-parser');
const Response = require('../classes/Response');
const { InvalidBodyError } = require('../errors');
const { onlySupportedMethods } = require('../middleware');
const { validateWithSchema } = require('../schemas/utils');
const { SiteCreateSchema } = require('../schemas/Site');
const { sitesDB } = require('../db');

const router = express.Router();
router.use(bodyParser.json());

router.post('/sites', (req, res, next) => {
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

router.all('/sites', onlySupportedMethods(['POST']));

module.exports = router;
