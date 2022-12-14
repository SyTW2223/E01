import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, jest, expect } from '@jest/globals';
import { newUser } from './entidades';

const { app, server } = require('../index');
const api = supertest(app);

let itemId = '';
function actualizarToken(token: string) {
  itemId = token;
}

jest.setTimeout(10000);

beforeAll( async() => {
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
      const res = await api.post('/user/login').send(newUser);
      expect(res.body.token).toBeDefined();
      expect(res.status).toBe(200);
      actualizarToken(res.body.token);
    });
    test('Should get a user', async () => {
        const res = await api.get('/user').send({token: itemId}).query({name: newUser.name});
        expect(res.status).toBe(200);
    });
    test('Should try to login a user with an incorrect password', async () => {
      await api
        .post('/user/login')
        .send({ name: 'test user', password: '1' })
        .expect(400)
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
        .send({name: "non-existent", password: "non-existent"})
        .expect(404)
    });
    test('Should try delete a unexistent user', async () => {
      await api
        .delete('/user')
        .send({token: itemId})
        .query({name: "non-existent"})
        .expect(404)
    });
    test('Should delete a user', async () => {
      await api
        .delete('/user')
        .send({token: itemId})
        .query({ name: newUser.name })
        .expect(200)
    });
  });

});

/** Closing connections */
afterAll( async () => {
  await mongoose.connection.close();
  server.close();
});
