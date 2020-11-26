/* eslint-disable import/namespace */
import Axios from 'axios';
import { expect } from 'chai';
import * as request from 'supertest';
import { api } from '../../..';
import { createUser, resetDb } from '../../setupTest';
import { testWrapper } from '../../testUtils';

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

  it('denies unauthorized user', async () => {
    await request(api).get('/auth').expect(401);
  });
});
