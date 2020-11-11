import * as functions from 'firebase-functions';
import * as camelCase from 'camelcase';
import * as glob from 'glob';
import * as dotenv from 'dotenv';
import app from './lib/app';

dotenv.config();

const files = glob.sync('./modules/**/*.f.js', {
  cwd: __dirname,
});

for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f];
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'
  if (
    !process.env.FUNCTION_NAME ||
    process.env.FUNCTION_NAME === functionName
  ) {
    exports[functionName] = require(file);
  }
}

export const api = functions.https.onRequest(app);
