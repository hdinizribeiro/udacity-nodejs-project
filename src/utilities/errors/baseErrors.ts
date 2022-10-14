// Here is the base error classes to extend from

interface ErrorData {
  key: string;
  value: string;
}

class ApplicationError extends Error {
  errorData?: ErrorData[];

  constructor(message: string, data?: ErrorData[]) {
    super(message);
    this.errorData = data;
  }

  get name() {
    return this.constructor.name;
  }
}

class DatabaseError extends ApplicationError {}

class UserFacingError extends ApplicationError {
  get statusCode() {
    return -1;
  }
}

export { ApplicationError, DatabaseError, UserFacingError };
