import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string) {
    console.log(`Logging message: ${message}`);
  }

  warn(message: string) {
    console.log(`Warning message: ${message}`);
  }

  error(message: string) {
    console.log(`Error message: ${message}`);
  }
}
