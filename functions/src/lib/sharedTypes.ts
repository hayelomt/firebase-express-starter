import { Request } from 'express';

export type ValidationErrorType = Record<string, String>;

export type ErrorType = ValidationErrorType | Object;

export type NewData<T> = { id: string | null; data: T };

export interface RequestExtended extends Request {
  token?: string;
}
