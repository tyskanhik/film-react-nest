import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    logger = module.get<TskvLogger>(TskvLogger);
  });

  it('should format log messages for TS KV', () => {
    const logMessage = 'Hello World';

    const logSpy = jest
      .spyOn(logger as any, 'writeToFile')
      .mockImplementation();

    logger.log(logMessage);
    expect(logSpy).toHaveBeenCalledWith('log', logMessage);

    logSpy.mockRestore();
  });

  it('should format error messages for TS KV', () => {
    const logMessage = 'An error occurred';

    const errorSpy = jest
      .spyOn(logger as any, 'writeToFile')
      .mockImplementation();

    logger.error(logMessage);
    expect(errorSpy).toHaveBeenCalledWith('error', logMessage, undefined);

    errorSpy.mockRestore();
  });
});
