import { DevLogger } from './dev.logger';

describe('Testing DevLogger', () => {
  let logger: DevLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new DevLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('log method', () => {
    it('should log message with correct format', () => {
      const testMessage = 'Test log message';

      logger.log(testMessage);

      expect(consoleSpy).toHaveBeenCalledWith(
        `Logging message: ${testMessage}`,
      );
    });
  });

  describe('warn method', () => {
    it('should warn message with correct format', () => {
      const warningMessage = 'Test warning';

      logger.warn(warningMessage);

      expect(consoleSpy).toHaveBeenCalledWith(
        `Warning message: ${warningMessage}`,
      );
    });
  });

  describe('error method', () => {
    it('should error message with correct format', () => {
      const errorMessage = 'Test error';

      logger.error(errorMessage);

      expect(consoleSpy).toHaveBeenCalledWith(`Error message: ${errorMessage}`);
    });
  });
});
