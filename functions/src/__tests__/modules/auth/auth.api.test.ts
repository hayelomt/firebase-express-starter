import app from '../../../modules/app';
import * as request from 'supertest';
import { createUser, resetDb } from '../../setupTest';

resetDb();

describe('auth', () => {
  it('denies unauthorized user', async () => {
    await request(app).get('/auth').expect(401);
  });

  it('authorizes signed in user', async () => {
    const { token } = await createUser();
    await request(app)
      .get('/auth')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
