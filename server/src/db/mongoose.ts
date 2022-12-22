import {connect} from 'mongoose';
import { URLDATABASE } from '../ENV';


/**
 * Connects to the Mongo server
 */
connect(URLDATABASE).then(() => {
  console.log('Connection to MongoDB server established');
}).catch((error) => {
  console.log('Unnable to connect to MongoDB server');
  console.log(error)
});