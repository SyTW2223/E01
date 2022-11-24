import * as express from 'express';
import { Objective } from '../models/objective';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Session } from '../models/session';

export const getRouter = express.Router();

getRouter.get('/user', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  User.find(filter).then((user) => {
    if (user.length !== 0) {
      res.send(user);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/session', (req, res) => {
  const filter = req.query.id?{id: req.query.id.toString()}:{};
  Session.find(filter).then((session) => {
    if (session.length !== 0) {
      res.send(session);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/objetive', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  Objective.find(filter).then((objetive) => {
    if (objetive.length !== 0) {
      res.send(objetive);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/task', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
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