import * as express from 'express';
import './db/mongoose';
import { defaultRouter } from './routes.ts/default';
import { getRouter } from './routes.ts/get';
import { postRouter } from './routes.ts/post';

const app = express();
app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(defaultRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});