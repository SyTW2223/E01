import { Objective } from "../models/objective";
import { Session } from "../models/session";
import { Task } from "../models/task";

/**
 * createObjective is a function used to create a new objective for a specific session in the application.
 * 
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the objective (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /objective
 * 
 * @returns {void} On success, a status code of 201 will be sent. On error, a status code of 500 will be sent.
 */
export const createObjective = async (req: any, res: any) => {
  const objective = new Objective({
    name: req.body.name,
    session: req.body.session,
    tasks: [],
  });

  try {
    const session = await Session.findById(req.body.session);
    if (session) {
      session.objectives.push(objective);
      const sessionPromise = session.save()
      const objectivePromise = objective.save()
      Promise.all([sessionPromise, objectivePromise])
        .then(() => {
          // ambos documentos han sido guardados con éxito
          res.status(201).send();
        })
        .catch((error) => {
          // alguno de los guardados ha fallado
          res.status(500).send(error);
        });   
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @method getObjective is a function used to retrieve an objective for a specific session from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the objective to retrieve (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /objective
 * 
 * @returns {void} On success, a status code of 200 and the objective will be sent. If no objective is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
export const getObjective = async (req: any, res: any) => {
  const filter = { name: req.query.name as string, session: req.query.session as string };
  Objective.find(filter).then((objective) => {
    if (objective.length !== 0) {
      res.status(200).send(objective);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
}

/**
 * @method deleteObjective is a function used to delete a specific objective and all of its associated tasks from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the objective to delete (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /objective
 * 
 * @returns {void} On success, a status code of 200 will be sent. If no objective is found, a status code of 404 will be sent. On error, a status code of 500 and an error message will be sent.
 */
export const deleteObjective = async (req: any, res: any) => {
  Objective.findOneAndDelete({ name: req.query.name as string, session: req.query.session as string })
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
}