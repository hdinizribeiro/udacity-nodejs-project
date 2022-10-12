import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { BadRequestError, NotFoundError } from './errors/userFacingErrors';

const resizeAndStore = async (
  imagePath: string,
  height: number,
  width: number
): Promise<string> => {
  if (height == 0 || width == 0) {
    throw new BadRequestError('Width or height must not be zero');
  }

  if (height > 2000 || width > 2000) {
    throw new BadRequestError('Image size too large');
  }

  if (!fs.existsSync(imagePath)) {
    throw new NotFoundError('Image not found');
  }

  const thumbsDir = `${path.dirname(imagePath)}/thumbs`;

  if (!fs.existsSync(thumbsDir)) {
    await fsPromises.mkdir(thumbsDir);
  }

  const parsedImagePath = path.parse(imagePath);
  const resultPath = `${thumbsDir}/${parsedImagePath.name}_${height}_${width}.${parsedImagePath.ext}`;

  if (fs.existsSync(resultPath)) {
    return resultPath;
  }

  await sharp(imagePath)
    .resize({
      height,
      width
    })
    .toFile(resultPath);

  return resultPath;
};

export default {
  resizeAndStore
};
