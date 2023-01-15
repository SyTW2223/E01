import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { test, describe, afterAll, beforeAll } from '@jest/globals';
import { newObjective, newSession, newTask, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

beforeAll(async () => {
  let res = await api.post('/user/login').send(newUser);
  token = res.body.token;
  newSession.user = decodeToken(token).id;
  res = await api.get('/session').send({ token: token }).query({ name: newSession.name, user: newSession.user.toString() })
  newObjective.session = res.body[0]._id;
  res = await api.get('/objective').send({ token: token}).query({name: newObjective.name,  session: newObjective.session.toString()})
  newTask.objective = res.body[0]._id;
});

/** Closing connections */
afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Delete`s endpoint', () => {
  test('Should delete a task', async () => {
    await api
      .delete('/task')
      .send({ token: token })
      .query({ name: newTask.name, objective: newTask.objective.toString() })
      .expect(200)
  });
  test('Should delete a objective', async () => {
    await api
      .delete('/objective')
      .send({ token: token })
      .query({ name: newObjective.name, session: newObjective.session.toString() })
      .expect(200)
  });
  test('Should delete a session', async () => {
    await api
      .delete('/session')
      .send({ token: token })
      .query({ name: newSession.name, user: newSession.user.toString() })
      .expect(200)
  });
  test('Should delete a user', async () => {
    await api
      .delete('/user')
      .send({ token: token })
      .query({ name: newUser.name })
      .expect(200)
  });
});
