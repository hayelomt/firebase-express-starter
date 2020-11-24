import * as express from 'express';
import * as bearer from 'express-bearer-token';

import errorHandler from '../middleware/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(bearer());

app.use(routes);

app.use(errorHandler);

export default app;
