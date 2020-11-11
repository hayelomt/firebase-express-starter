import { expect } from 'chai';
import { CloudFunction, database } from 'firebase-functions';
import { resetDb, test } from '../../../setupTest';
import onCreateF from '../../../../modules/messages/rtdb/onCreate.f';
import { admin } from '../../../../lib/admin';

resetDb();

describe('onCreate', () => {
  let onCreateFunction: CloudFunction<database.DataSnapshot>;
  before(() => {
    onCreateFunction = onCreateF;
  });

  it('adds new message', async () => {
    const messageId = Math.random().toString(36).substring(7);
    const snap = test.database.makeDataSnapshot(
      {
        title: 'title',
        message: 'some message',
      },
      `/messages/${messageId}`
    );

    const wrapped = test.wrap(onCreateFunction);
    await wrapped(snap, { params: { messageId } });

    const createdBackup = await admin
      .database()
      .ref(`msg-backup/${messageId}`)
      .once('value');

    expect(createdBackup.exists()).to.be.true;
  });

  it('is 1', () => {
    expect(1).to.equal(1);
  });
});
