import {connect} from 'mongoose';

/**
 * If the enviroment variable is not stablished connects to
 * the url
 */
const mongodb_url = 'mongodb+srv://admin:usuario1@sytw-app.gamhgvw.mongodb.net/?retryWrites=true&w=majority';

/**
 * Connects to the Mongo server
 */
connect(mongodb_url).then(() => {
  console.log('Connection to MongoDB server established');
}).catch((error) => {
  console.log('Unnable to connect to MongoDB server');
  console.log(error)
});