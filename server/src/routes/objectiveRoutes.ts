import * as express from 'express';

import { createObjective, getObjective, deleteObjective } from "../controllers/objectiveController";

/**
 * Contains all the functionality of objectives
 */
export const objectiveRouter = express.Router();

objectiveRouter.post('/objective', createObjective);
objectiveRouter.get('/objective', getObjective);
objectiveRouter.delete('/objective', deleteObjective);
