import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';
import { Task } from '../models/task';
import { generateToken } from './get';

/**
 * Contains all the functionality to store items in the database
 */
export const postRouter = express.Router();


  postRouter.post('/user/login', async (req, res) => {
    try {
      const userExists = await User.findOne({ name: req.body.name });
      if (userExists ) {
        userExists.password === req.body.password? res.status(200).send() : res.status(400).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  postRouter.post('/user', async (req, res) => {
    try {
      const userExists = await User.findOne({ name: req.body.name });
      if (userExists) {
        res.status(404).json({ message: "User alredy exist", status: 404 });
      } else {
        const user = new User({
          name: req.body.name,
          password: req.body.password,
          sessions: [],
          token: generateToken(req.body.password) as string,
        });
        await user.save();
        res.status(201).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  postRouter.post('/session', async (req, res) => {   
    const session = new Session({
        name: req.body.name,
        user: req.body.user,
        time: req.body.time,
        objetives: [],        
    });
    try {
        const user = await User.findById(req.body.user);
        if (user) {
            user.sessions.push(session);
            await user.save();
            res.status(201);
        }
        await session.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
  });

  postRouter.post('/objective', async (req, res) => {
    const objective = new Objective({
        name: req.body.name,
        session: req.body.session,
        tasks: [],        
    });
    
    try {
        const session = await Session.findById(req.body.session);
        session?.objectives.push(objective);
        await session?.save();
        res.status(201);
        await objective.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

postRouter.post('/task', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        objective: req.body.objective,        
    });

    try {
        const objective = await Objective.findById(req.body.objective);
        if (objective) {
            objective.tasks.push(task);
            await objective.save();
            res.status(201);
        }
        await task.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});
