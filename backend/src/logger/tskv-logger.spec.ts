import { TskvLogger } from './tskv.logger';

describe('Testing TskvLogger', () => {
  let logger: TskvLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('log method', () => {
    it('should log message with basic TSV format', () => {
      const testMessage = 'This is a log message';

      logger.log(testMessage);

      const expectedOutput = `level=log\tmessage=${testMessage}\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it('should log message with optional parameters', () => {
      const testMessage = 'User action';
      const optionalParams = {
        userId: '123',
        action: 'login',
        timestamp: '2023-01-01',
      };

      logger.log(testMessage, optionalParams);

      const expectedOutput = `level=log\tmessage=${testMessage}\tuserId=123\taction=login\ttimestamp=2023-01-01\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });
  });

  describe('warn method', () => {
    it('should warn message with correct TSV format', () => {
      const warningMessage = 'This is a warning';

      logger.warn(warningMessage);

      const expectedOutput = `level=warn\tmessage=${warningMessage}\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it('should warn message with optional parameters', () => {
      const warningMessage = 'Deprecation warning';
      const optionalParams = {
        version: 'v1.0',
        severity: 'medium',
        replacement: 'v2.0',
      };

      logger.warn(warningMessage, optionalParams);

      const expectedOutput = `level=warn\tmessage=${warningMessage}\tversion=v1.0\tseverity=medium\treplacement=v2.0\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it('should handle numeric values in optional parameters', () => {
      const warningMessage = 'Performance warning';
      const optionalParams = { responseTime: 150, threshold: 100, count: 5 };

      logger.warn(warningMessage, optionalParams);

      const expectedOutput = `level=warn\tmessage=${warningMessage}\tresponseTime=150\tthreshold=100\tcount=5\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });
  });

  describe('error method', () => {
    it('should error message with correct TSV format', () => {
      const errorMessage = 'This is an error';

      logger.error(errorMessage);

      const expectedOutput = `level=error\tmessage=${errorMessage}\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it('should error message with optional parameters', () => {
      const errorMessage = 'Database connection failed';
      const optionalParams = {
        database: 'primary',
        errorCode: 'CONN_REFUSED',
        retryCount: 3,
        timeout: 5000,
      };

      logger.error(errorMessage, optionalParams);

      const expectedOutput = `level=error\tmessage=${errorMessage}\tdatabase=primary\terrorCode=CONN_REFUSED\tretryCount=3\ttimeout=5000\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });

    it('should handle boolean values in optional parameters', () => {
      const errorMessage = 'Validation failed';
      const optionalParams = {
        isValid: false,
        hasRetries: true,
        isCritical: true,
      };

      logger.error(errorMessage, optionalParams);

      const expectedOutput = `level=error\tmessage=${errorMessage}\tisValid=false\thasRetries=true\tisCritical=true\n`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedOutput);
    });
  });
});
