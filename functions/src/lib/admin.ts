import * as firebaseAdmin from 'firebase-admin';

try {
  firebaseAdmin.initializeApp({
    databaseURL: 'http://localhost:9000/?ns=typer-1154b',
    projectId: 'fire-tut-36ff2',
  });
} catch (_err) {}

export const db = firebaseAdmin.firestore();

export const rtdb = firebaseAdmin.database();

export const admin = firebaseAdmin;
