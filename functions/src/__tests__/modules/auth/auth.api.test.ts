import app from '../../../modules/app';
import * as request from 'supertest';
import { resetDb } from '../../setupTest';

resetDb();

describe('auth', () => {
  it('denies unauthorized user', async () => {
    await request(app).get('/auth').expect(401);
  });
});
