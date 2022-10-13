import express from 'express';
import path from 'path';
import { BadRequestError } from '../../utilities/errors/userFacingErrors';
import imageProcessor from '../../utilities/imageProcessor';
const images = express.Router();

const imageDir = path.resolve('./assets/images');

images.get('/', async (req, res, next) => {
  try {
    if (!req.query.imageName || !req.query.width || !req.query.height) {
      throw new BadRequestError(
        'The imageName, width and height must be informed on querystring'
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
});

export default images;
