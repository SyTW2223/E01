import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';
import { Task } from '../models/task';

/**
 * Contains all the functionality to store items in the database
 */
export const deleteRouter = express.Router();

deleteRouter.delete('/user', (req, res) => {
    User.findOneAndDelete({ name: req.query.name as string })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "User not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/session', (req, res) => {
    Session.findOneAndDelete({ id: req.query.id as string })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Session not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/objective', (req, res) => {
    Objective.findOneAndDelete({ id: req.query.name as string })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Objective not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/task', (req, res) => {
    Task.findOneAndDelete({ id: req.query.name as string })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Task not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});