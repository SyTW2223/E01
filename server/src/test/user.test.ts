// import mongoose from 'mongoose';
// import * as supertest from 'supertest';
// import {User} from '../models/user';


// const {app, server} = require('../index');
// const api = supertest(app);

// describe('Users Model Test', () => {
  
//   describe('Post user route test', () => {
//     describe('Create a new user that not exist', () => {
//       it('Should go OK', async () => {
//         const newUser = new User({
//           name: 'test',
//           password: 'test'
//         });

//         await api
//           .post('/user')
//           .send(newUser)
//           .expect(200)
//       });
//     });

//     describe('Create a new user that exist', () => {
//       it('Should return a 404', () => {

//       });
//     });
//   });

//   describe('Get user route test', () => {
//     describe('Get a user that not exist', () => {
//       it('Should return a 404', () => {

//       });
//     });

//     describe('Get a user that exist', () => {
//       it('Should go OK', () => {

//       });
//     });
//   });

//   describe('Delete user route test', () => {
//     describe('Delete a user that not exist', () => {
//       it('Should return a 404', () => {

//       });
//     });

//     describe('Delete a user that exist', () => {
//       it('Should go OK', () => {

//       });
//     });
//   });
// });

// /** Cierro las conexiones */
// afterAll(() => {
//   server.close();
//   mongoose.connection.close();
// });