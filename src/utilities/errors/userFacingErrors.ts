import { UserFacingError } from './baseErrors';

class BadRequestError extends UserFacingError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return 400;
  }
}

class NotFoundError extends UserFacingError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return 404;
  }
}

export { BadRequestError, NotFoundError };
