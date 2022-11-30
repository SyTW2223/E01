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
        result.sessions.forEach((session) => {
          let filter = session.toString(); 
          Session.findByIdAndDelete(filter as string)
          .then((each_session) => {
            each_session?.objectives.forEach((objective) => {
              let filter = objective.toString(); 
              Objective.findByIdAndDelete(filter as string)
              .then((each_objectives) => {
                each_objectives?.tasks.forEach((task) => {
                  let filter = task.toString(); 
                  Task.findByIdAndDelete(filter as string)
                  .then(() => {
                    res.status(200);
                  });
                });
              });
            });
          });
        });
        res.status(200).send("User, User's session, objectives and tasks deleted.");
      } else {
        res.status(404).json({ message: "User not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/session', (req, res) => {
    Session.findOneAndDelete({ id: req.query.id as string, user: req.query.user as string})
    .then((each_session) => {
      each_session?.objectives.forEach((objective) => {
        let filter = objective.toString(); 
        Objective.findByIdAndDelete(filter as string)
        .then((each_objectives) => {
          each_objectives?.tasks.forEach((task) => {
            let filter = task.toString(); 
            Task.findByIdAndDelete(filter as string)
            .then(() => {
              res.status(200);
            });
          });
        });
      });
      res.status(200).send("Session, session's objectives and tasks deleted.");
    })      
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

deleteRouter.delete('/objective', (req, res) => {
    Objective.findOneAndDelete({ id: req.query.name as string, session: req.query.session as string})
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