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
      if ( generateToken(user[0].password)===  generateToken(req.query.password as string)) {
        res.status(201).send({status: 201});
      } else {
        res.status(500).send();
      } 
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/session', (req, res) => {
  const filter = req.query.name?{id: req.query.name.toString()}:{};
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