const { sequelize } = require('../config/database');
const UserModel = require('./User');

const db = {};

db.sequelize = sequelize;

db.User = UserModel(sequelize);

// Associations (if any) would go here
// e.g., db.Post.belongsTo(db.User)

module.exports = db;
