import winston from 'winston';

interface LogColors {
  info: string;
  warn: string;
  error: string;
  [key: string]: string;
}

const colors: LogColors = {
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    const color = colors[level] || '\x1b[0m';
    return `${timestamp} ${color}${level}\x1b[0m: ${color}${message}\x1b[0m`;
  })
);

const consoleTransport = new winston.transports.Console();

const logger = winston.createLogger({
  format: logFormat,
  transports: [consoleTransport],
});

export function log(message: string, logs: boolean) {
  if (!logs) {
    return;
  }

  logger.info(message);
}

export function logError(error: Error, message?: string) {
  logger.error(message ? `${message}: ${error.message}` : '');
}

export default logger;
