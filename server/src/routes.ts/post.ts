import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';

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
    user.save().then((user) => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

postRouter.post('/session', (req, res) => {
    if (!req.body.user) {
        res.status(400).send({
            error: "The user must exist"
        })
    }
    const session = new Session({
        id: req.body.id,
        user: req.body.user,
        time: req.body.time,
        objetives: [],        
    });
    session.save().then((session) => {
        res.status(201).send(session);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

postRouter.post('/objective', (req, res) => {
    if (!req.body.session) {
        res.status(400).send({
            error: "The session must exist"
        })
    }
    const objective = new Objective({
        name: req.body.name,
        tasks: [],        
    });
    objective.save().then((objective) => {
        res.status(201).send(objective);
    }).catch((error) => {
        res.status(400).send(error);
    });
});