const { User } = require('../models');

module.exports = {
  create: (data, options = {}) => User.create(data, options),
  findByEmail: (email) => User.findOne({ where: { email } }),
  findById: (id) => User.findByPk(id),
  findAll: (options = {}) => User.findAll(options),
  updateById: async (id, updates) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(updates);
    return user;
  },
  deleteById: async (id) => {
    const user = await User.findByPk(id);
    if (!user) return 0;
    await user.destroy();
    return 1;
  },
};
