import * as express from 'express';
import MessageController from './messageController';
import validationHandler from '../../middleware/validationHandler';
import MessageRepo from './messageRepo';
const router = express.Router();

const messageController = new MessageController();

router.post(
  '/',
  validationHandler(MessageRepo.validationRules()),
  messageController.store()
);

export default router;
