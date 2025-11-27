const { success, fail } = require('../utils/response');
const service = require('../services/user.service');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) return fail(res, 'Missing fields', 400);
      const result = await service.register({ name, email, password });
      return success(res, result, 'User registered', 201);
    } catch (err) {
      return next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return fail(res, 'Missing email or password', 400);
      const result = await service.login({ email, password });
      return success(res, result, 'Logged in');
    } catch (err) {
      return next(err);
    }
  },

  me: async (req, res, next) => {
    try {
      const result = await service.getProfile(req.user.id);
      return success(res, result);
    } catch (err) {
      return next(err);
    }
  },

  list: async (_req, res, next) => {
    try {
      const users = await service.list();
      return success(res, users);
    } catch (err) {
      return next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await service.getById(req.params.id);
      return success(res, user);
    } catch (err) {
      return next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await service.update(req.params.id, req.body);
      return success(res, user, 'Updated');
    } catch (err) {
      return next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await service.remove(req.params.id);
      return success(res, null, 'Deleted', 204);
    } catch (err) {
      return next(err);
    }
  },
};
