import { database } from 'firebase-functions';
import { rtdb } from '../../../lib/admin';

export default database.ref('/messages/{messageId}').onCreate((snap, ctx) => {
  const { messageId } = ctx.params;
  return rtdb.ref(`msg-backup/${messageId}`).set(snap.val());
});
