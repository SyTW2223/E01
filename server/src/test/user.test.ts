import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, jest } from '@jest/globals';
import { newUser } from './entidades';

const { app, server } = require('../index');
const api = supertest(app);

jest.setTimeout(10000);

beforeAll(() => {
});


describe('Default route Test', () => {
  test('Should try to make a request to a non-existent route', async () => {
    await api
      .post('/non')
      .expect(501)
  });
})

describe('Users Model Test', () => {
  describe('User`s endpoint OK test', () => {
    test('Should create a new user that not exist', async () => {
      await api
        .post('/user')
        .send(newUser)
        .expect(201)
    });
    test('Should try to create a new user that alredy exist', async () => {
      await api
        .post('/user')
        .send(newUser)
        .expect(404)
    });
    test('Should login a user', async () => {
      await api
        .post('/user/login')
        .send(newUser)
        .expect(200)
    });
    test('Should try to login a user with an incorrect password', async () => {
      await api
        .post('/user/login')
        .send({name: 'test', password: '1'})
        .expect(400)
    });
    test('Should get a user', async () => {
      await api
        .get('/user')
        .query({ name: newUser.name, password: newUser.password })
        .expect(200)
    });
    test('Should delete a user', async () => {
      await api
        .delete('/user')
        .query({ name: newUser.name })
        .expect(200)
    });
  });

  describe('User`s endpoint BAD REQUEST test', () => {
    test('Should try to post a user without any field', async () => {
      await api
        .post('/user')
        .expect(500)
    });
    test('Should try to login a user that doesnt exist', async () => {
      await api
        .post('/user/login')
        .send(newUser)
        .expect(404)
    });
    test('Should try to get a user without any field', async () => {
      await api
        .get('/user')
        .expect(404)
    });
    test('Should try delete a unexistent user', async () => {
      await api
        .delete('/user')
        .expect(404)
    });
  });

});

/** Closing connections */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});