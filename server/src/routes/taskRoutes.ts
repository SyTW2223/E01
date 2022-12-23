import * as express from 'express';

import { createTask, getTask, deleteTask } from "../controllers/taskController";

/**
 * Contains all the functionality of tasks
 */
export const taskRouter = express.Router();

taskRouter.post('/task', createTask);
taskRouter.get('/task', getTask);
taskRouter.delete('/task', deleteTask);
