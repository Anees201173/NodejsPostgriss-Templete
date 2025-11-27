const env = require('../config/env');

const levels = ['error', 'warn', 'info', 'debug'];

function log(level, ...args) {
  const currentIdx = levels.indexOf(env.logLevel) !== -1 ? levels.indexOf(env.logLevel) : 2;
  const msgIdx = levels.indexOf(level);
  if (msgIdx <= currentIdx) {
    // Simple timestamped log
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console[level === 'debug' ? 'log' : level](`[${ts}] [${level.toUpperCase()}]`, ...args);
  }
}

module.exports = {
  error: (...a) => log('error', ...a),
  warn: (...a) => log('warn', ...a),
  info: (...a) => log('info', ...a),
  debug: (...a) => log('debug', ...a),
};
