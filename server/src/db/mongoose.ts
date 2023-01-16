import mongoose from 'mongoose';
const config = require('../../config.ts');

mongoose.set('strictQuery', false);
/**
 * Connects to the Mongo server
 */
mongoose.connect(config.URLDATABASE, {sslValidate: false}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch((error) => {
  console.log('Unnable to connect to MongoDB server');
  console.log(error)
});
