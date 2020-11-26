/* eslint-disable import/namespace */
import { HttpsFunction } from 'firebase-functions';
import * as request from 'supertest';
import * as sinon from 'sinon';
// import * as jest from 'jest';
import * as authMiddleware from '../middleware/authMiddleware';

const sandbox = sinon.createSandbox();

type TestCallback = (request: Function, api: HttpsFunction) => Promise<void>;

export const stubAuth = async (cb: TestCallback) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // console.log(jest.isolateModules);
  await (async () => {
    // eslint-disable-next-line import/no-unassigned-import
    // require('../index');
    // await import('../index');
  })();
  sandbox
    .stub(authMiddleware, 'isAuthenticated')
    .callsFake(() => async (req, res, next) => {
      console.log('authenticated fake');
      next();
    });
  const { api } = await import('../index');

  await cb(request, api);

  // authMiddleware.isAuthenticated.restore()

  sandbox.restore();
  sandbox.reset();
  // delete require.cache[require.resolve('../index')];

  // await import('../index');
  console.log('restored');
};
