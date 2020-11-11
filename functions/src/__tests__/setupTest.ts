import * as functionTest from 'firebase-functions-test';
import * as path from 'path';
// import * as dotenv from 'dotenv';
import { admin } from '../lib/admin';

const test = functionTest(
  {
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
  },
  path.join(__dirname, '..', '..', 'privateKey.json')
);

const resetDb = () => {
  beforeEach(async () => {
    await admin.database().ref('/').remove();
  });

  after(() => {
    test.cleanup();
  });
};

export { test, resetDb };
