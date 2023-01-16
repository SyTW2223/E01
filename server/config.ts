/** 
 *  @filename : config.js
*/ 
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  URLDATABASE: process.env.URLDATABASE || path.resolve(__dirname, process.env.NODE_ENV + '.env')
}
