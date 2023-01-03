import { JWT_SECRET } from "../ENV"
const jwt = require('jsonwebtoken');
/**
 * 
 * @param id Id to sign the token.
 * @returns a JWT token with 30 days of time.
 */
export const generateToken = (id: string) => {
  return jwt.sign( {id}, JWT_SECRET, {expiresIn: '30d'})
}

export const decodeToken = (token: any) => {
  return jwt.verify(token, JWT_SECRET);
}