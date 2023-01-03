import * as cors from 'cors';
import * as express from 'express';

import './db/mongoose';

import { defaultRouter } from './routes/default';
import { objectiveRouter } from './routes/objectiveRoutes';
import { sessionRouter } from './routes/sessionRoutes';
import { taskRouter } from './routes/taskRoutes';
import { userRouter } from './routes/userRoutes';
const cookieParser = require('cookie-parser')

const app = express();


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/", userRouter);
app.use("/", sessionRouter);
app.use("/", objectiveRouter);
app.use("/", taskRouter);
app.use("/", defaultRouter);

const port = 4000;

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {app, server};