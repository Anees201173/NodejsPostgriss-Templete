const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const repo = require('../repositories/user.repo');

function makeToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

module.exports = {
  async register({ name, email, password }) {
    const exists = await repo.findByEmail(email);
    if (exists) throw new Error('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await repo.create({ name, email, password: hash });
    const token = makeToken(user);
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  },

  async login({ email, password }) {
    const user = await repo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');
    const token = makeToken(user);
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  },

  async getProfile(userId) {
    const user = await repo.findById(userId);
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name, email: user.email };
  },

  async list() {
    const users = await repo.findAll({ attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
    return users;
  },

  async getById(id) {
    const user = await repo.findById(id);
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name, email: user.email };
  },

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await repo.updateById(id, data);
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name, email: user.email };
  },

  async remove(id) {
    const count = await repo.deleteById(id);
    if (!count) throw new Error('User not found');
    return true;
  },
};
