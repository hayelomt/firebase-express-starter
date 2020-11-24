import ApiError from "./apiError";

export default class AuthenticationError extends ApiError {
  constructor(public message: string = "Not Authenticated") {
    super({}, message, 401);
  }
}
