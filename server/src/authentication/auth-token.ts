import { User } from "../models/user";
import { decodeToken } from "./token";

export const authentication =async (req: any, res: any, next: any) => {
  const token = req.body.token;
  const decoded = await decodeToken(token);
  const userExists = await User.findById(decoded.id)
  if (userExists) {
    next()
  } else {
    res.status(401).send();
  }
}
