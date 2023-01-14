import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { test, afterAll, beforeAll, describe, expect } from '@jest/globals';
import { newSession, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const { app, server } = require('../index');
const api = supertest(app);
let token = ''

beforeAll(async () => {
  const res = await api.post('/user/login').send(newUser);
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
    const res = await api.get('/user').send({ token: token }).query({ name: newUser.name });
    expect(res.status).toBe(200);
  });
  test('Should get a session', async () => {
    await api
      .get('/session')
      .send({ token: token })
      .query({ name: newSession.name, user: newSession.user.toString() })
      .expect(200)
  });
});


