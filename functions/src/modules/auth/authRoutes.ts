import { Router } from 'express';
import * as authMiddleware from '../../middleware/authMiddleware';
import validationHandler from '../../middleware/validationHandler';
import AuthController from './authController';
import AuthRepo from './AuthRepo';

const router = Router();
const authController = new AuthController();

router.get('/', authMiddleware.isAuthenticated(), (req, res) => {
  res.json({ auth: true });
});

router.post(
  '/login',
  validationHandler(AuthRepo.loginValidationRules()),
  authController.login()
);

export default router;
