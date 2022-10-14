import express, { ErrorRequestHandler } from 'express';
import { UserFacingError } from '../utilities/errors/baseErrors';

const defaultErrorMiddleware: ErrorRequestHandler = (
  err: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
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
