import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, expect } from '@jest/globals';
import { newSession, newUser } from './entidades';
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
  describe('User`s endpoints', () => {
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
  });
});
