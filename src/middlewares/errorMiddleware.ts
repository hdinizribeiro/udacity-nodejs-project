import { ErrorRequestHandler } from 'express';
import { UserFacingError } from '../utilities/errors/baseErrors';

const defaultErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof UserFacingError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, data: err.errorData });
  } else {
    res.sendStatus(500);
  }

  next();
};

export { defaultErrorMiddleware };
