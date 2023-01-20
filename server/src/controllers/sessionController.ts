import { Objective } from "../models/objective";
import { Session } from "../models/session";
import { Task } from "../models/task";
import { User } from "../models/user";




/**
 * @method createSession is a function used to create a new session for a specific user in the application.
 * 
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the session (string)
 *   - user: the ID of the user who owns the session (string)
 *   - time: the time of the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /session
 * 
 * @returns {void} On success, a status code of 201 will be sent. On error, a status code of 500 will be sent.
 */
export const createSession = async (req: any, res: any) => {
  const session = new Session({
    name: req.body.name,
    user: req.body.user,
    time: req.body.time,
    objetives: [],
  });
  try {
    const user = await User.findById(req.body.user.toString());
    if (user) {
      user.sessions.push(session);
      const userPromise = user.save();
      const sessionPromise = session.save();
      Promise.all([userPromise, sessionPromise])
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
 * @method getSession is a function used to retrieve a session for a specific user from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the session to retrieve (string)
 *   - user: the name of the user who owns the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @route : /session
 * 
 * @returns {void} On success, a status code of 200 and the session will be sent. If no session is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
export const getSession = async (req: any, res: any) => {
  const filter = { name: req.query.name as string, user: req.query.user as string };
  Session.find(filter).then((session) => {
    if (session.length !== 0) {
      res.status(200).send(session);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
}

export const getSessionById = async (req: any, res: any) => {
  Session.findById(req.query.id).then((session) => {
      res.status(200).send(session);
  }).catch(() => {
    res.status(404).send();
  });
}
/**
 * @method deleteSession is a function used to delete a specific session and all of its associated objectives and tasks from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the session to delete (string)
 *   - user: the name of the user who owns the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @returns {void} On success, a status code of 200 and a message will be sent. If no session is found, a status code of 404 will be sent. On error, a status code of 500 and an error message will be sent.
 */
export const deleteSession = async (req: any, res: any) => {
  Session.findOneAndDelete({name: req.query.name as string, user: req.query.user as string})
  .then((each_session) => {
    if (each_session) {
      each_session.objectives.forEach((objective) => {
        let filter = objective.toString(); 
        Objective.findByIdAndDelete(filter as string)
        .then((each_objectives) => {
          each_objectives?.tasks.forEach((task) => {
            let filter = task.toString(); 
            Task.findByIdAndDelete(filter as string);
          });
        });
      });
      res.status(200).send("Session, session's objectives and tasks deleted.");
    } else {
      res.status(404).send();
    }
  })      
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}
