import * as express from 'express';
import { Objective } from '../models/objective';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Session } from '../models/session';
export const getRouter = express.Router();



getRouter.get('/objective', (req, res) => {
  const filter = {name: req.query.name as string, session: req.query.session as string};
  Objective.find(filter).then((objective) => {
    if (objective.length !== 0) {
      res.status(200).send(objective);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/task', (req, res) => {
  const filter = {name: req.query.name as string, objective: req.query.objective as string};
  Task.find(filter).then((task) => {
    if (task.length !== 0) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});