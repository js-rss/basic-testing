  import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(Promise.resolve(resolveValue)).resolves.toBe(resolveValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
      const throwEroror = () => {
      throwError('message: Error');
    };
    expect(throwEroror).toThrow('message: Error');
  });

  test('should throw error with default message if message is not provided', () => {
    const notProvided = () => {
      throwError(undefined);
    };
    expect(notProvided).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(new MyAwesomeError());
  });
});


describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
     await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError())
  });
});
