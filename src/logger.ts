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

function formatLog(level: string, message: string): string {
  const timestamp = new Date().toISOString();
  const color = colors[level] || '\x1b[0m';
  return `${timestamp} ${color}${level}\x1b[0m: ${color}${message}\x1b[0m`;
}

export function log(message: string, logs: boolean) {
  if (!logs) {
    return;
  }

  console.log(formatLog('info', message));
}

export function logError(error: Error, message?: string) {
  console.error(formatLog('error', message ? `${message}: ${error.message}` : error.message));
}

export default { log, logError };
