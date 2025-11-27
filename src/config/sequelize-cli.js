const env = require('./env');

// sequelize-cli configuration; uses DATABASE_URL and enables SSL
const common = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: env.databaseUrl?.includes('sslmode=require')
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  },
  define: {
    timestamps: true,
  },
};

module.exports = {
  development: common,
  test: common,
  production: common,
};
