import * as admin from 'firebase-admin';

admin.initializeApp({
  databaseURL: 'http://localhost:9000/?ns=typer-1154b',
  projectId: 'fire-tut-36ff2',
});

export const db = admin.firestore();

export const rtdb = admin.database();
