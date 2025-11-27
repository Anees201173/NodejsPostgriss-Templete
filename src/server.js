const app = require('./app');
const env = require('./config/env');
const { connectDB } = require('./config/database');

(async () => {
  await connectDB();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${env.port}`);
  });
})();
