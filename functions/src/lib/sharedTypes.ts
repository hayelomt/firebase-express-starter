export type ValidationErrorType = Record<string, String>;

export type ErrorType = ValidationErrorType | Object;

export type NewData<T> = { id: string | null; data: T };
