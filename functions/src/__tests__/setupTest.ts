import axios from 'axios';
import * as path from 'path';
import * as faker from 'faker';
import * as functionTest from 'firebase-functions-test';
import { admin, firebase } from '../lib/firebase';
let userUids: string[] = [];

const test = functionTest(
  {
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
  },
  path.join(__dirname, '..', '..', 'privateKey.json')
);

const deleteUsers = async () => {
  try {
    const deletePromises: Promise<void>[] = [];
    userUids.forEach((userUid) => {
      deletePromises.push(admin.auth().deleteUser(userUid));
    });
    await Promise.all(deletePromises);
    userUids = [];
  } catch (err) {
    console.log('Reset Db Error', err);
  }
};

const resetDb = () => {
  beforeEach(async () => {
    await admin.database().ref().remove();
  });

  after(async () => {
    await deleteUsers();
  });

  after(async () => {
    // console.log('after');
    test.cleanup();
    await admin.database().ref().remove();
  });
};

const createUser = async (
  email?: string,
  password: string = 'secret'
): Promise<TestUserType> => {
  const userEmail = email || faker.internet.email();

  try {
    const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, password);

    const {
      data: { token },
    } = await axios.post(
      'http://localhost:5001/typer-1154b/us-central1/api/auth/login',
      {
        email: userEmail,
        password,
      }
    );

    userUids.push(newUser.user?.uid as string);
    return { token, email: userEmail, password, user: newUser };
  } catch (err) {
    console.log('Create User Error', err);
  }

  return { token: 'token', email: userEmail, password, user: undefined };
};

export { test, resetDb, createUser };

export type TestUserType = {
  token: string;
  email: string;
  password: string;
  user: Object | undefined;
};
