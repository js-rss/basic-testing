// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const newAB = getBankAccount(1);
    expect(newAB.getBalance()).toBe(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newAB = getBankAccount(1);
    const FnWD = () => {
      newAB.withdraw(2);
    };
    expect(FnWD).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAB = getBankAccount(1);
    const newAB2 = getBankAccount(2);
    const Fntransfer = () => {
      newAB.transfer(2, newAB2);
    };
    expect(Fntransfer).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const newAB = getBankAccount(1);
    const transferError = () => {
      newAB.transfer(1, newAB);
    };
    expect(transferError).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newAB = getBankAccount(1);
    expect(newAB.getBalance()).toBe(1);
    newAB.deposit(2);
    expect(newAB.getBalance()).toBe(3);
  });

  test('should withdraw money', () => {
    const newAB = getBankAccount(2);
    expect(newAB.getBalance()).toBe(2);
    newAB.withdraw(1);
    expect(newAB.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const newAB = getBankAccount(10);
    const newAB2 = getBankAccount(10);
    newAB.transfer(5, newAB2);
    expect(newAB.getBalance()).toBe(5);
    expect(newAB2.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newAB = getBankAccount(10);
    jest.unmock('lodash');
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 1);
    expect(await newAB.fetchBalance()).toBe(1);
  });
  test('should set new balance if fetchBalance returned number', async () => {
    const newAB = getBankAccount(10);
    jest.unmock('lodash');
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 1);
    await newAB.synchronizeBalance();
    expect(newAB.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newAB = getBankAccount(10);
    jest.spyOn(newAB, 'fetchBalance').mockResolvedValue(null);
    await expect(newAB.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
