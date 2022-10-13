# Fullstack javascript developer - Backend development with nodejs project

## Purpose

This project is destinated to udacity reviewer of module Backend development with node js.

## The application

The application of this project intent to resize an already existing image based on a width and height provided via querystring.

### Available api's

GET /api/image?imageName={name_of_image}&width={width_in_pixels}&height={height_in_pixels}

Available values for name_of_image:

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

### Responses

- 200:
  - Image resized successfully
- 400:
  - Width or height is 0 or above 2000 pixels
  - Image name, or width, or height not informed
- 404:
  - Image not found

## Scripts

### Build

`npm run build`: Builds the application into javascript

### Start

`npm start`: Starts the application using nodemon on localhost:3000

### Test

`npm run test`: Run all the test suites of the application.
