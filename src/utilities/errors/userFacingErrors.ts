import { UserFacingError } from './baseErrors';

class BadRequestError extends UserFacingError {
  get statusCode() {
    return 400;
  }
}

class NotFoundError extends UserFacingError {
  get statusCode() {
    return 404;
  }
}

export { BadRequestError, NotFoundError };
