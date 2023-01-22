import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { jest, test, afterAll, beforeAll, describe, expect } from '@jest/globals';
import { newObjective, newSession, newTask, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

jest.setTimeout(10000)

beforeAll(async () => {
  let res = await api.post('/user/login').send(newUser);
  token = res.body.token
  newSession.user = decodeToken(token).id
});

/** Closing connections */
afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Get`s endpoint', () => {
  test('Should get a user', async () => {
    const res = await api.get('/user').query({ token: token, name: newUser.name });
    expect(res.status).toBe(200);
  });
  test('Should get a session', async () => {
    const session = await api.get('/session').send({ token: token }).query({ name: newSession.name, user: newSession.user.toString() })
    expect(session.status).toBe(200);
    newObjective.session = session.body[0]._id;

  });
  test('Should get a objective', async () => {
    const objective = await api.get('/objective').send({ token: token }).query({ name: newObjective.name, session: newObjective.session.toString() })
    expect(objective.status).toBe(200)
    newTask.objective = objective.body[0]._id;
  });
  test('Should get a task', async () => {
    await api
      .get('/task')
      .send({ token: token })
      .query({ name: newTask.name, objective: newTask.objective.toString() })
      .expect(200)
  });

  test('Should try to get a user', async () => {
    const res = await api.get('/user').query({ token: token, name: "no existo" });
    expect(res.status).toBe(404);
  });
  test('Should try to get a session', async () => {
    const session = await api.get('/session').send({ token: token }).query({ name: "no existo", user: newSession.user.toString() })
    expect(session.status).toBe(404);

  });
  test('Should try to get a objective', async () => {
    const objective = await api.get('/objective').send({ token: token }).query({ name: "no existo", session: newObjective.session.toString() })
    expect(objective.status).toBe(404)
  });
  test('Should try toget a task', async () => {
    await api
      .get('/task')
      .send({ token: token })
      .query({ name: "no existo", objective: newTask.objective.toString() })
      .expect(404)
  });
  // Internal server
  test('Should try to get a session', async () => {
    const session = await api.get('/session').send({ token: token }).query({ name: "no existo", user: "no existo" })
    expect(session.status).toBe(500);

  });
  test('Should try to get a objective', async () => {
    const objective = await api.get('/objective').send({ token: token }).query({ name: "no existo", session: "no existo" })
    expect(objective.status).toBe(500)
  });
  test('Should try to get a task', async () => {
    await api
      .get('/task')
      .send({ token: token })
      .query({ name: "no existo", objective:"no existo" })
      .expect(500)
  });
});


