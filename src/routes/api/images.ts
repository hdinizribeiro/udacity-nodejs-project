import express from 'express';
import path from 'path';
import imageProcessor from '../../utilities/imageProcessor';
const images = express.Router();

const imageDir = path.resolve('./assets/images');

images.get('/', async (req, res, next) => {
  const filePath = path.join(imageDir, req.query.filename as string) + '.jpg';
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  try {
    const resultPath = await imageProcessor.resizeAndStore(
      filePath,
      width,
      height
    );

    res.sendFile(resultPath);
  } catch (err) {
    next(err);
  }
});

export default images;
