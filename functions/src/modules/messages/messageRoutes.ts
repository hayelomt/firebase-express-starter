import * as express from 'express';
import MessageController from './messageController';
import validationHandler from '../../middleware/validationHandler';
import MessageRepo from './messageRepo';
const router = express.Router();

const messageController = new MessageController();

router.post(
  '/',
  // (
  //   req: express.Request,
  //   _res: express.Response,
  //   next: express.NextFunction
  // ) => {
  //   console.log('middle', req.body);
  //   next();
  // },
  validationHandler(MessageRepo.validationRules()),
  messageController.store()
);

export default router;
