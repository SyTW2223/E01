import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';
import { Task } from '../models/task';

/**
 * Contains all the functionality to store items in the database
 */
export const postRouter = express.Router();

postRouter.post('/user', (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        sessions: [],
    });
    User.findOne({ name: req.body.name})
    .then((result) => {
      if (result) {
        res.status(404).json({ message: "User already exist." });
      } else {
        user.save().then((user) => {
          res.status(201).send(user);
        }).catch((error) => {
            res.status(400).send(error);
        });
      }
    })
});

postRouter.post('/session', (req, res) => {   
    if (!req.body.user) {
        res.status(400).send ({
            error: "The user must exist"
        })
    } else {
        const session = new Session({
            name: req.body.name,
            user: req.body.user,
            time: req.body.time,
            objetives: [],        
        });
        User.findById(req.body.user).then((user) => {
            if (user) {
                user.sessions.push(session);
                user.save().then(() => {
                    res.status(201);
                }).catch((error) => {
                    res.status(500).send(error);
                });
            }
            session.save().then((session) => {
                res.status(201).send(session);
            }).catch((error) => {
                res.status(400).send(error);
            });
        })
    }
    
});

postRouter.post('/objective', (req, res) => {
    if (!req.body.session) {
        res.status(400).send({
            error: "The session must exist"
        })
    }
    
    const objective = new Objective({
        name: req.body.name,
        session: req.body.session,
        tasks: [],        
    });
    
    Session.findById(req.body.session).then((session) => {
        session?.objectives.push(objective);
        session?.save().then(() => {
            res.status(201);
        }).catch((error) => {
            res.status(500).send(error);
        });
        objective.save().then((objective) => {
            res.status(201).send(objective);
        }).catch((error) => {
            res.status(400).send(error);
        });
    });
});

postRouter.post('/task', (req, res) => {
    if (!req.body.objective) {
        res.status(400).send({
            error: "The objective must exist"
        })
    }
    const task = new Task({
        name: req.body.name,
        objective: req.body.objective,        
    });

    Objective.findById(req.body.objective).then((objective) => {
        if (objective) {
            objective.tasks.push(task);
            objective.save().then(() => {
                res.status(201);
            }).catch((error) => {
                res.status(500).send(error);
            });
        }
        task.save().then((task) => {
            res.status(201).send(task);
        }).catch((error) => {
            res.status(400).send(error);
        });
    });
});