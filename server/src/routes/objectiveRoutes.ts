import * as express from 'express';
import { authentication } from '../authentication/auth-token';

import { createObjective, getObjective, deleteObjective, getObjectiveById } from "../controllers/objectiveController";

/**
 * Contains all the functionality of objectives
 */
export const objectiveRouter = express.Router();

objectiveRouter.post('/objective', authentication, createObjective);
objectiveRouter.get('/objective', authentication, getObjective);
objectiveRouter.get('/objective/id', authentication, getObjectiveById);

objectiveRouter.delete('/objective', authentication, deleteObjective);
