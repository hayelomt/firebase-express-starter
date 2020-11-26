/* eslint-disable import/namespace */
import Axios from 'axios';
import { expect } from 'chai';
// import * as request from 'supertest';
import { createUser, resetDb, testWrapper } from '../../setupTest';
import { stubAuth } from '../../testUtils';

resetDb();

let token: string;

describe('auth', () => {
  before(async () => {
    token = (await createUser()).token;
  });

  testWrapper(it, 'authorizes user request', async () => {
    const { data } = await Axios.get(
      'http://localhost:5001/typer-1154b/us-central1/api/auth',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(data).to.deep.equal({ auth: true });
  });

  it('passes user', async () => {
    console.log(stubAuth);
    await stubAuth(async (stubReq, stubApi) => {
      await stubReq(stubApi).get('/auth').expect(200);
    });
  });

  it('denies unauthorized user', async () => {
    // const { api } = await import('../../../index');
    // await request(api).get('/auth').expect(401);
  });
});
