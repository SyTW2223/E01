import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll } from '@jest/globals';
import { newUser } from './entidades';

const {app, server} = require('../src/index');
const api = supertest(app);


beforeAll(() => {
});

describe('Users Model Test', () => {
  describe('User`s endpoint OK test', () => {
    test('Should create a new user that not exist', async () => {
      await api
        .post('/user')
        .send(newUser)
        .expect(201)
    });
    test('Should get a user', async () => {
      await api
      .get('/user')
      .query({name: newUser.name, password: newUser.password})
      .expect(200)
    });
    test('Should delete a user', async () => {
      await api
      .delete('/user')
      .query({name: newUser.name})
      .expect(200)
    });
  });

  describe('User`s endpoint BAD REQUEST test', () => {
    test('Should try to post a user withou any field', async () => {
      await api
        .post('/user')
        .expect(400)
    });
    test('Should try to get a user without any field', async () => {
      await api
      .get('/user')
      .expect(500)
    });
    test('Should try delete a unexistent user', async () => {
      await api
      .delete('/user')
      .expect(404)
    });
  });

});

/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});