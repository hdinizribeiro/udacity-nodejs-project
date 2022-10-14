import express from 'express';
import imagesRoute from './api/images';

const routes = express.Router();

routes.use('/images', imagesRoute);

export default routes;
