import cors = require('cors');
import * as express from 'express';

import './db/mongoose';
import { defaultRouter } from './routes/default';
import { deleteRouter } from './routes/delete';
import { getRouter } from './routes/get';
import { postRouter } from './routes/post';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use(postRouter);
app.use(getRouter);
app.use(deleteRouter);
app.use(defaultRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});