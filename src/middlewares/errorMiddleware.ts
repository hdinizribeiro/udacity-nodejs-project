import { ErrorRequestHandler } from 'express';
import { UserFacingError } from '../utilities/errors/baseErrors';

const defaultErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof UserFacingError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.sendStatus(500);
  }

  next();
};

export { defaultErrorMiddleware };
