import path from 'path';
import imageProcessor from '../../src/utilities/imageProcessor';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import {
  BadRequestError,
  NotFoundError
} from '../../src/utilities/errors/userFacingErrors';

describe('Resize image tests', () => {
  beforeEach(async () => {
    const thumbsDir = path.resolve('./tests/assets/images/thumbs');
    await fsPromises.rm(thumbsDir, { force: true, recursive: true });
  });

  it('Should throw error if the width or height is 0', async () => {
    // Arrange
    // Act
    const promise = imageProcessor.resizeAndStore('notExisting', 0, 1);

    // Assert
    // Assert
    await expectAsync(promise).toBeRejectedWithError(
      BadRequestError,
      'Width or height must not be zero'
    );
  });

  it('Should throw error if the images does not exist', async () => {
    // Arrange
    // Act
    const promise = imageProcessor.resizeAndStore('notExisting', 1, 1);

    // Assert
    // Assert
    await expectAsync(promise).toBeRejectedWithError(
      NotFoundError,
      'Image not found'
    );
  });

  it('Should throw error if the size requests is above 2000x2000', async () => {
    // Arrange
    // Act
    const promise = imageProcessor.resizeAndStore('any', 2001, 2000);

    // Assert
    await expectAsync(promise).toBeRejectedWithError(
      BadRequestError,
      'Image size too large'
    );
  });

  it('Should create the thumb directory if it does not exist', async () => {
    // Arrange
    const imagePath = path.resolve('./tests/assets/images/encenadaport.jpg');
    const thumbsDir = `${path.dirname(imagePath)}/thumbs`;

    // Act
    await imageProcessor.resizeAndStore(imagePath, 1, 1);

    // Assert
    const thumbsDirExist = fs.existsSync(thumbsDir);
    expect(thumbsDirExist).toBeTrue();
  });

  it('Should not resize again if the image already exists', async () => {
    // Arrange
    const imagePath = path.resolve('./tests/assets/images/encenadaport.jpg');
    const resizedImagePath = await imageProcessor.resizeAndStore(
      imagePath,
      100,
      100
    );
    const thumbsDir = `${path.dirname(imagePath)}/thumbs`;
    const imageResizedStats = await fsPromises.stat(resizedImagePath);

    // Act
    await imageProcessor.resizeAndStore(imagePath, 100, 100);

    // Assert
    const thumbDirFiles = await fsPromises.readdir(thumbsDir);
    expect(thumbDirFiles.length).toBe(1);
    const newStat = await fsPromises.stat(resizedImagePath);
    expect(newStat).toEqual(imageResizedStats);
  });

  it('Should resize the image, store it and return the path of the image resized', async () => {
    // Arrange
    const originalImagePath = path.resolve(
      './tests/assets/images/encenadaport.jpg'
    );

    // Act
    const resizedImagePath = await imageProcessor.resizeAndStore(
      originalImagePath,
      500,
      500
    );

    // Assert
    const originalImageStats = await fsPromises.stat(originalImagePath);
    const resizedImageStats = await fsPromises.stat(resizedImagePath);

    expect(resizedImageStats.size).toBeLessThan(originalImageStats.size);
  });
});

/*
[v] - Should throw error if the images does not exist
[v] - Should create the thumb directory if it does not exist
[v] - Should not resize if the image already exists
[v] - Should resize the image, store it and return the path of the image resized
[v] - Should throw error if the size requests is above 2000x2000
[v] - Should throw error if the size or height is 0
*/
