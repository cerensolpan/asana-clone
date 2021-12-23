const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'task-service' },
  transports: [
    new winston.transports.File({ filename: 'v1/src/logs/tasks/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'v1/src/logs/tasks/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'v1/src/logs/tasks/combined.log'}),
    // new winston.transports.Console()
  ],
});

module.exports = logger;