import * as express from 'express';
import { authentication } from '../authentication/auth-token';
import { registerUser, loginUser, getUser, deleteUser } from "../controllers/userController";

/**
 * Contains all the functionality of users in the database
 */
export const userRouter = express.Router();

userRouter.post('/user', registerUser);
userRouter.post('/user/login', loginUser);
userRouter.get('/user', authentication, getUser);
userRouter.delete('/user', authentication, deleteUser);
