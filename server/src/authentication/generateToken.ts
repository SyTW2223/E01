import { JWT_SECRET } from "../ENV"
const jwt = require('jsonwebtoken');
/**
 * 
 * @param id 
 * @returns 
 */
export const generateToken = (id: string) => {
  return jwt.sign( {id}, JWT_SECRET, {expiresIn: '30d'})
}