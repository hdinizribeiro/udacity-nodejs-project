import express from 'express';
import { defaultErrorMiddleware } from './middlewares/errorMiddleware';
import routes from './routes';

const app = express();
const port = 3000;

app.use('/api', routes);
app.use(defaultErrorMiddleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server startd at http://localhost:${port}`);
});

export default app;
