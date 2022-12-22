import * as express from 'express';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Objective} from '../models/objective';
import { Task } from '../models/task';
import { loginUser, registerUser } from '../controllers/userController';


  

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
