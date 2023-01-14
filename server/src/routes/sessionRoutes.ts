import * as express from 'express';
import { authentication } from '../authentication/auth-token';

import { createSession, getSession, deleteSession } from "../controllers/sessionController";

/**
 * Contains all the functionality of sessions
 */
export const sessionRouter = express.Router();

sessionRouter.post('/session', authentication, createSession);
sessionRouter.get('/session', authentication, getSession);
sessionRouter.delete('/session', authentication, deleteSession);
