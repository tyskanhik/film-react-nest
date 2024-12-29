import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);
  });

  it('should format log messages as JSON', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Hello World');
    expect(logSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'Hello World',
        optionalParams: [],
      }),
    );

    logSpy.mockRestore();
  });

  it('should format error messages as JSON', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('An error occurred');
    expect(errorSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'An error occurred',
        optionalParams: [],
      }),
    );

    errorSpy.mockRestore();
  });

  it('should format warning messages as JSON', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('This is a warning');
    expect(warnSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: 'This is a warning',
        optionalParams: [],
      }),
    );

    warnSpy.mockRestore();
  });
});
