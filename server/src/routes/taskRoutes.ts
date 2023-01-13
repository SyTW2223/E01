import * as express from 'express';
import { authentication } from '../authentication/auth-token';

import { createTask, getTask, deleteTask } from "../controllers/taskController";

/**
 * Contains all the functionality of tasks
 */
export const taskRouter = express.Router();

taskRouter.post('/task', authentication, createTask);
taskRouter.get('/task', authentication, getTask);
taskRouter.delete('/task', authentication, deleteTask);
