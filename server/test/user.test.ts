import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { User } from '../src/models/user';
import { describe, test, afterAll, beforeAll } from '@jest/globals';

const {app, server} = require('../src/index');
const api = supertest(app);

/* Entidades del testeo */
const newUser = new User({
  name: 'test',
  password: 'test'
});

beforeAll(() => {
});

describe('Users Model Test', () => {
  describe('Post user route test', () => {
    test('Should create a new user that not exist', async () => {
      await api
        .post('/user')
        .send(newUser)
        .expect(400)
    });

    // describe('Create a new user that exist', () => {
    //   it('Should return a 404', () => {

    //   });
    // });
  });

  // describe('Get user route test', () => {
  //   describe('Get a user that not exist', () => {
  //     it('Should return a 404', () => {

  //     });
  //   });

  //   describe('Get a user that exist', () => {
  //     it('Should go OK', () => {

  //     });
  //   });
  // });

  // describe('Delete user route test', () => {
  //   describe('Delete a user that not exist', () => {
  //     it('Should return a 404', () => {

  //     });
  //   });

  //   describe('Delete a user that exist', () => {
  //     it('Should go OK', () => {

  //     });
  //   });
  // });
});

/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});