import app from '../../../src';
import supertest from 'supertest';

const request = supertest(app);

describe('Test image endpoint responses', () => {
  it('Should return 404 if the file does not exist', async () => {
    const response = await request.get(
      '/api/images?filename=notExisting&width=200&height=200'
    );

    expect(response.statusCode).toBe(404);
  });

  it('Should return 400 the width or height is 0', async () => {
    const response = await request.get(
      '/api/images?filename=notExisting&width=0&height=200'
    );

    expect(response.statusCode).toBe(400);
  });

  it('Should return 200 if the file exist and it was resized correctly', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=100'
    );

    expect(response.statusCode).toBe(200);
  });
});

/*
[] Should return 404 if the file does not exist
[] Should return 200 if the file exist and it was resized correctly
[] Should return 400 the width or height is 0 (above 2000x2000)
*/
