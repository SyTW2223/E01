import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, expect } from '@jest/globals';
import { newObjective, newSession, newTask, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzBiYzAwMWUxNzQ4ZDNhZDA1OGI1OSIsImlhdCI6MTY3MzU3NTQyOCwiZXhwIjoxNjc2MTY3NDI4fQ.0J1UrNHr-DbA-nxg3VAu-HwL5q4bx6EmEt-oCmpxMUo'

beforeAll(async () => {
});

/** Closing connections */
afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Post`s endpoint', () => {
  describe('Sucessful`s endpoints', () => {
    test('Should create a new user', async () => {
      await api.post('/user')
        .send(newUser).
        expect(201)
    });
    test('Should login a user', async () => {
      const res = await api.post('/user/login').send(newUser);
      expect(res.body.token).toBeDefined();
      expect(res.status).toBe(200);
      token = res.body.token
      newSession.user = decodeToken(token).id
    });
    test('Should create a new session', async () => {
      await api
        .post('/session')
        .send({ token: token, ...newSession })
        .expect(201)
    });
    test('Should create a new objective', async () => {
      const res = await api.get('/session').send({ token: token }).query({ name: newSession.name, user: newSession.user.toString() })
      newObjective.session = res.body[0]._id;
      await api
        .post('/objective')
        .send({ token: token, ...newObjective })
        .expect(201)
    });
    test('Should create a new task', async () => {
      const res = await api.get('/objective').send({ token: token }).query({ name: newObjective.name, session: newObjective.session.toString() })
      newTask.objective = res.body[0]._id;
      await api
        .post('/task')
        .send({ token: token, ...newTask })
        .expect(201)
    });
  });
  describe('No token endpoints', () => {
    test('Should try create a new session', async () => {
      await api
        .post('/session')
        .send({ newSession })
        .expect(404)
    });
    test('Should try create a new objective', async () => {
      await api
        .post('/objective')
        .send({ newObjective })
        .expect(404)
    });
    test('Should try create a new task', async () => {
      await api
        .post('/task')
        .send({ newTask })
        .expect(404)
    });
  });
  describe('Unauthorized`s endpoints', () => {
    test('Should try to create a new session without the correct token', async () => {
      await api
        .post('/session')
        .send({ token: token2, ...newSession })
        .expect(401)
    });
    test('Should try to create a new objective without the correct token', async () => {
      await api
        .post('/objective')
        .send({ token: token2, ...newObjective })
        .expect(401)
    });
    test('Should try to create a new task without the correct token', async () => {
      await api
        .post('/task')
        .send({ token: token2, ...newTask })
        .expect(401)
    });
  });

});
