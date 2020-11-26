import { TestFunction } from 'mocha';

const TEST_TIMEOUT: number = process.env.DEFAULT_TEST_TIMEOUT
  ? parseInt(process.env.DEFAULT_TEST_TIMEOUT)
  : 2000;

export const testWrapper = (
  it: TestFunction,
  message: string,
  cb: Function,
  timeout: number = TEST_TIMEOUT
) => {
  it(message, async () => {
    await cb();
  }).timeout(timeout);
};
