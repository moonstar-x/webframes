const express = require('express');
const sites = require('./sites');

const api = express.Router();

api.use('/sites', sites);

module.exports = api;
