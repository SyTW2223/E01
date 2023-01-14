import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { test, describe, afterAll, beforeAll } from '@jest/globals';
import { newSession, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

beforeAll(async () => {
  const res = await api.post('/user/login').send(newUser);
  token = res.body.token;
  newSession.user = decodeToken(token).id;
});

/** Closing connections */
afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Delete`s endpoint', () => {
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
