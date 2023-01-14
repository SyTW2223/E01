const jwt = require('jsonwebtoken');
const config = require('../../config.js');

const JWT_SECRET = config.JWT_SECRET
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