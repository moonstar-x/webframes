require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('@greencoast/logger');
const { logRequests, handleError } = require('./middleware');
const { ResourceNotFoundError } = require('./errors');
const api = require('./api');

const HTTP_PORT = process.env.HTTP_PORT || 4000;
const WEBAPP_PATH = path.join(__dirname, '../../webapp/public');

const app = express();
app.use(cors());
app.use(logRequests);

app.options('*', cors());

app.use('/api', api);

app.use(express.static(WEBAPP_PATH));

app.all('*', () => {
  throw new ResourceNotFoundError('This route is not handled by the server.');
});

app.use(handleError);

app.listen(HTTP_PORT, () => {
  logger.info(`API listening on port ${HTTP_PORT}`);
});
