import express from 'express';
import path from 'path';
import { BadRequestError } from '../../utilities/errors/userFacingErrors';
import imageProcessor from '../../utilities/imageProcessor';
import { query, validationResult } from 'express-validator';

const images = express.Router();

const imageDir = path.resolve('./assets/images');

images.get(
  '/',
  query('imageName').notEmpty(),
  query('width').isNumeric(),
  query('height').isNumeric(),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new BadRequestError(
          'Check request, there are some invalid values',
          errors.array().map((e) => {
            return { key: e.param, value: e.msg };
          })
        );
      }

      const imagePath =
        path.join(imageDir, req.query.imageName as string) + '.jpg';
      const width = parseInt(req.query.width as string);
      const height = parseInt(req.query.height as string);

      const resultPath = await imageProcessor.resizeAndStore(
        imagePath,
        width,
        height
      );

      res.sendFile(resultPath);
    } catch (err) {
      next(err);
    }
  }
);

export default images;
