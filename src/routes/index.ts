import express from 'express';
import teachers from './api/images';

const routes = express.Router();

routes.use('/images', teachers);

export default routes;
