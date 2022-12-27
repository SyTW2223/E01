import { Session } from "../models/session";
import { User } from "../models/user";
import { Objective } from "../models/objective";
import { Task } from "../models/task";

const user = new User({
  name: 'test',
  password: 'test'
});


const session = new Session({
  name: 'test session',
  user: user._id.toString()
});


const objective = new Objective({
  name: 'test objective',
  session: session._id.toString()
});

const task = new Task({
  name: 'test task',
  objective: objective._id.toString()
});


export const newUser = {
  name: user.name,
  password: user.password
}

export const newSession = {
  name: session.name,
  user: session.user
}

export const newObjective = {
  name: objective.name,
  session: objective.session
}

export const newTask = {
  name: task.name,
  objective: task.objective
}
