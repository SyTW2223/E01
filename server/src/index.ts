import * as cors from 'cors';
import * as express from 'express';

import './db/mongoose';
import { defaultRouter } from './routes/default';

import { userRouter } from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use(userRouter);

const port = 4000;

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {app, server};