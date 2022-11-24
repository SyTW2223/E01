import * as express from 'express';
import './db/mongoose';
import { defaultRouter } from './routes.ts/default';
import { postRouter } from './routes.ts/post';

const app = express();
app.use(express.json());
app.use(postRouter);


app.get("/", (_req, res) => {
  res.send("Hello");
});

app.use(defaultRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});