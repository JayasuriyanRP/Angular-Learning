export class LoggingService implements ILoggingService {
  constructor() {}

  logMessage(message: string) {
    //console.log(message);
  }
}

export interface ILoggingService {
  logMessage(message: string);
}
