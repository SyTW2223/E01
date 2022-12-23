import * as express from 'express';

import { createSession, getSession, deleteSession } from "../controllers/sessionController";

/**
 * Contains all the functionality of sessions
 */
export const sessionRouter = express.Router();

sessionRouter.post('/session', createSession);
sessionRouter.get('/session', getSession);
sessionRouter.delete('/session', deleteSession);
