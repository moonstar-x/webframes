require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('@greencoast/logger');
const { logRequests, onlySupportedMethods, handleError } = require('./middleware');
const { ResourceNotFoundError } = require('./errors');
const Response = require('./classes/Response');
const api = require('./api');

const HTTP_PORT = process.env.HTTP_PORT || 4000;

const app = express();
app.use(cors());
app.use(logRequests);

app.options('*', cors());

app.use('/api', api);

app.get('/', (req, res) => {
  const response = new Response(Response.CODES.OK);
  res.status(response.code).send(response.create());
});

app.all('/', onlySupportedMethods(['GET']));

app.all('*', () => {
  throw new ResourceNotFoundError('This route is not handled by the server.');
});

app.use(handleError);

app.listen(HTTP_PORT, () => {
  logger.info(`API listening on port ${HTTP_PORT}`);
});
