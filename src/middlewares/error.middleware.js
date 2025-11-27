const logger = require('../utils/logger');
const { fail } = require('../utils/response');

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, _next) {
  const status = err.status || 400;
  const message = err.message || 'Unexpected error';
  logger.error('Error:', message, err.stack);
  return fail(res, message, status);
};