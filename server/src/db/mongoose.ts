import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
/**
 * Connects to the Mongo server
 */
mongoose.connect('mongodb+srv://admin:admin@cluster0.kousrlu.mongodb.net/main-app?retryWrites=true&w=majority', {sslValidate: false}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch((error) => {
  console.log('Unnable to connect to MongoDB server');
  console.log(error)
});
