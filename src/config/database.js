const { Sequelize } = require('sequelize');
const env = require('./env');

// Configure Sequelize for Neon (Postgres with SSL)
const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: env.nodeEnv === 'development' ? console.log : false,
  dialectOptions: {
    ssl: env.databaseUrl?.includes('sslmode=require')
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  },
  define: {
    underscored: false,
    freezeTableName: false,
    timestamps: true,
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.warn('Database connection failed:', err.message);
  }
}

module.exports = { sequelize, connectDB };
