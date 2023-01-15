import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, expect } from '@jest/globals';
import { newObjective, newSession, newTask, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

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
        .send({token: token, ...newSession})
        .expect(201)
    });
    test('Should create a new objective', async () => {
      const res = await api.get('/session').send({token: token}).query({name: newSession.name, user: newSession.user.toString()})
      newObjective.session = res.body[0]._id;    
      await api
        .post('/objective')
        .send({ token: token, ...newObjective })
        .expect(201)
    });
    test('Should create a new task', async () => {
      const res = await api.get('/objective').send({ token: token}).query({name: newObjective.name,  session: newObjective.session.toString()}) 
      newTask.objective = res.body[0]._id;
      await api
        .post('/task')
        .send({ token: token, ...newTask })
        .expect(201)
    });
  });
});
