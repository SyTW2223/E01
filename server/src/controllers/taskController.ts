import { Objective } from "../models/objective";
import { Task } from "../models/task";

/**
 * @method createTask is a function used to create a new task for a specific objective in the application.
 * 
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the task (string)
 *   - objective: the ID of the objective that the task belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /task
 * 
 * @returns {void} On success, a status code of 201 will be sent. On error, a status code of 500 will be sent.
 */
export const createTask = async (req: any, res: any) => {
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
}
/**
 * @method getTask is a function used to retrieve a task for a specific objective from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the task to retrieve (string)
 *   - objective: the ID of the objective that the task belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /task
 * 
 * @returns {void} On success, a status code of 200 and the task will be sent. If no task is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
export const getTask = async (req: any, res: any) => {
  const filter = { name: req.query.name as string, objective: req.query.objective as string };
  Task.find(filter).then((task) => {
    if (task.length !== 0) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
}

/**
 * @method deleteTask is a function used to delete a specific task from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the task to delete (string)
 *   - objective: the ID of the objective that the task belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /task
 * 
 * @returns {void} On success, a status code of 200 and the deleted task will be sent. If no task is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
export const deleteTask = async (req: any, res: any) => {
  Task.findOneAndDelete({ name: req.query.name as string, objective: req.query.objective as string })
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
}

