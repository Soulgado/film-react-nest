import { JsonLogger } from './json.logger';

describe('Testing JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('log method', () => {
    it('should log message with correct JSON format', () => {
      const testMessage = 'This is a log message';

      logger.log(testMessage);

      const expectedLog = JSON.stringify({
        level: 'log',
        message: testMessage,
        optionalParams: [],
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });

    it('should log message with optional parameters', () => {
      const testMessage = 'User action';
      const optionalParams = ['user123', { action: 'login' }];

      logger.log(testMessage, ...optionalParams);

      const expectedLog = JSON.stringify({
        level: 'log',
        message: testMessage,
        optionalParams: optionalParams,
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });
  });

  describe('warn method', () => {
    it('should warn message with correct JSON format', () => {
      const warningMessage = 'This is a warning';

      logger.warn(warningMessage);

      const expectedLog = JSON.stringify({
        level: 'warn',
        message: warningMessage,
        optionalParams: [],
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });

    it('should warn with optional parameters', () => {
      const warningMessage = 'Deprecation warning';
      const optionalParams = [
        'v1.0',
        'Use v2.0 instead',
        { severity: 'medium' },
      ];

      logger.warn(warningMessage, ...optionalParams);

      const expectedLog = JSON.stringify({
        level: 'warn',
        message: warningMessage,
        optionalParams: optionalParams,
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });
  });

  describe('error method', () => {
    it('should error message with correct JSON format', () => {
      const errorMessage = 'This is an error';

      logger.error(errorMessage);

      const expectedLog = JSON.stringify({
        level: 'error',
        message: errorMessage,
        optionalParams: [],
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });

    it('should error with Error objects and context', () => {
      const error = 'Database connection failed';
      const context = ['critical error', { date: new Date() }];

      logger.error(error, context);

      const expectedLog = JSON.stringify({
        level: 'error',
        message: error,
        optionalParams: [context],
      });
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });
  });
});
