import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger extends ConsoleLogger {
  private writeToFile(level: string, message: string, trace?: string) {
    return `level=${level}\ttime=${new Date().toISOString()}\tmessage=${message}${trace ? `\ttrace=${trace}` : ''}`;
  }

  log(message: string) {
    this.writeToFile('log', message);
  }

  error(message: string, trace?: string) {
    this.writeToFile('error', message, trace);
  }
  warn(message: string) {
    this.writeToFile('warn', message);
  }
}
