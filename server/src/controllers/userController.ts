import { generateToken } from "../authentication/generateToken";
import { Objective } from "../models/objective";
import { Session } from "../models/session";
import { Task } from "../models/task";
import { User } from "../models/user";

/**
 * @method registerUser is a function used to register a new user in the application.
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the user to register (string)
 *   - password: the password of the user to register (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * @router : /user
 * @returns {void} On success, a status code of 201 will be sent. If the user already exists, 
 * a status code of 404 with an error message will be sent. On error, a status code of 500 and the error will be sent.
 */
export const registerUser = async (req: any, res: any) => {
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
}
/**
 * @method loginUser is a function used to log in a user to the application.
 * 
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the user logging in (string)
 *   - password: the password of the user logging in (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * @router : /user/login
 * 
 * @returns {void} On success, a status code of 200 will be sent. If the user does not exist, a status code of 404 will be sent. If the password is incorrect, a status code of 400 will be sent. On error, a status code of 500 and the error will be sent.
 */
export const loginUser = async (req: any, res: any) => {
  try {
    const userExists = await User.findOne({ name: req.body.name });
    if (userExists) {
      userExists.password === req.body.password ? res.status(200).send() : res.status(400).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @method getUser is a function used to retrieve a user from the application.
 * 
 * @param {any} req - The request object, which should contain a query string with the following field:
 *   - name: the name of the user to retrieve (string).
 * @param {any} res - The response object, which will be used to send the response to the client.
 * 
 * * @router : /user
 * 
 * @returns {void} On success, a status code of 200 and the user(s) will be sent. If no user is found, a 
 * status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
export const getUser = async (req: any, res: any) => {
  const filter = { name: req.query.name };
  User.findOne(filter).then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
}

/**
 * @method deleteUser is a function used to delete a user and all of their associated sessions, objectives, and tasks from the application.
 * 
 * @param {Request} req - The request object, which should contain a query string with the following field:
 *   - name: the name of the user to delete (string)
 * @param {Response} res - The response object, which will be used to send the response to the client.
 * 
 * @route: /user
 * 
 * @returns {void} On success, a status code of 200 and a message will be sent. If no user is found, a status code of 404 and a message will be sent. On error, a status code of 500 and an error message will be sent.
 */
export const deleteUser = async (req: any, res: any) => {
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
}
