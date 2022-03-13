import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';

export class CronLogger extends ConsoleLogger {
  // Logger winston
  private logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'cron' },
    transports: [new winston.transports.File({ filename: 'combined.log' })],
  });

  //   Handle log
  error(message: any, stack?: string, context?: string) {
    this.logger.log('error', message);
    super.error(message);
  }
  log(message: any, stack?: string, context?: string) {
    this.logger.log('info', message);
    super.log(message);
  }
}
