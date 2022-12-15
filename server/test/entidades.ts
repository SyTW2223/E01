import { Session } from "../src/models/session";
import { User } from "../src/models/user";
import { Objective } from "../src/models/objective";
import { Task } from "../src/models/task";

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
