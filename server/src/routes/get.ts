import * as express from 'express';
import { Objective } from '../models/objective';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Session } from '../models/session';
export const getRouter = express.Router();

const jwt = require('jsonwebtoken');
const jwt_secret = 'abc123';

// Generar JWT:
export const generateToken = (id: string) => {
  return jwt.sign( {id}, jwt_secret, {expiresIn: '30d'})
}

getRouter.get('/user', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  User.find(filter).then((user) => {
      if ( generateToken(user[0].password) ===  generateToken(req.query.password as string)) {
        res.status(200).send({status: 200});
      } else {
        res.status(500).send();
      } 
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/session', (req, res) => {
  const filter = {name: req.query.name as string, user: req.query.user as string };
  Session.find(filter).then((session) => {
    if (session.length !== 0) {
      res.status(200).send(session);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

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