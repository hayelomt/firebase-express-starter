import { check } from 'express-validator';

export default class AuthRepo {
  static loginValidationRules() {
    return [
      check('email')
        .isString()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Must be a valid email'),
      check('password').isString().withMessage('Password required'),
    ];
  }
}
