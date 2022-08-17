import winston, { format, transports } from 'winston';
import { utilities, WinstonModule } from 'nest-winston';

export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('whatApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ], // alert > error > warning > notice > info > debug
    };
  }

  public console(): object {
    return this.options;
  }
}
