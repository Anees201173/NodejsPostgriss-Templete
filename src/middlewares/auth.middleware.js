const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { fail } = require('../utils/response');

module.exports = function auth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return fail(res, 'Unauthorized', 401);
  }
  const token = parts[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return fail(res, 'Unauthorized', 401);
  }
};