import * as express from 'express';

/**
 * Contains all non-specified routes
 */
export const defaultRouter = express.Router();

defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});