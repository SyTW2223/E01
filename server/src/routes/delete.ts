import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';
import { Task } from '../models/task';

/**
 * Contains all the functionality to store items in the database
 */
export const deleteRouter = express.Router();




deleteRouter.delete('/objective', (req, res) => {
  Objective.findOneAndDelete({name: req.query.name as string, session: req.query.session as string})
  .then((each_objectives) => {
    if (each_objectives) {
      each_objectives.tasks.forEach((task) => {
        let filter = task.toString(); 
        Task.findByIdAndDelete(filter as string);
      });
      res.status(200).send();
    } else {
      res.status(404).send();
    }

  })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/task', (req, res) => {
    Task.findOneAndDelete({ name: req.query.name as string, objective: req.query.objective as string})
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