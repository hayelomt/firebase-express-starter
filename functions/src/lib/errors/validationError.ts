import ApiError from './apiError';
import { ValidationErrorType } from '../sharedTypes';

export default class ValidationError extends ApiError {
  constructor(public errors: ValidationErrorType) {
    super(errors, 'Bad Request', 400);
  }
}
