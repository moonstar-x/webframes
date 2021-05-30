const Response = require('../classes/Response');

class InvalidOrderError extends Error {
  constructor(message) {
    super(message);

    this.name = 'InvalidOrderError';
    this.statusCode = Response.CODES.BAD_REQUEST;
  }
}

module.exports = InvalidOrderError;
