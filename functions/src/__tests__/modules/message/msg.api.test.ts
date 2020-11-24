// import * as index from '../../../index';
import * as request from 'supertest';
import app from '../../../modules/app';
import { resetDb } from '../../setupTest';
import { admin } from '../../../lib/firebase';
import { expect } from 'chai';

resetDb();

describe('message api', () => {
  it('creates new message', async () => {
    const data = { title: 'Hey', message: 'Body' };
    const res = await request(app)
      .post('/messages')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201);

    const msgs = await admin.database().ref('/messages').once('value');
    const keys = Object.keys(msgs.val());

    expect(keys.length).to.equal(1);
    const id = keys[0];
    expect(res.body).to.deep.equal({ data: { id, data } });
  });

  it('invalidate', async () => {
    await request(app)
      .post('/messages')
      .expect(400)
      .expect({
        message: 'Bad Request',
        errors: {
          message: 'Message Required',
          title: 'Title Required',
        },
      });

    await request(app)
      .post('/messages')
      .send({ title: 'Hey' })
      .set('Accept', 'application/json')
      .expect(400)
      .expect({
        message: 'Bad Request',
        errors: {
          message: 'Message Required',
        },
      });
  });
});
