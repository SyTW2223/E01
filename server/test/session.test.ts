import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, jest } from '@jest/globals';
import { newSession } from './entidades';

const {app, server} = require('../src/index');
const api = supertest(app);

jest.setTimeout(10000);

beforeAll(() => {
});

describe('Session Model Test', () => {
  describe('Session OK test', () => {
    test('Should create a new session that not exist', async () => {
      await api
        .post('/session')
        .send(newSession)
        .expect(201)
    });
    
    test('Should get a session', async () => {
      await api
        .get('/session')
        .query({name: newSession.name, user: newSession.user.toString()})
        .expect(200)
    });

    test('Should delete a session', async () => {
      await api
        .delete('/session')
        .query({name: newSession.name, user: newSession.user.toString()})
        .expect(200)
    });

  });
  describe('Session BAD REQUEST test', () => {
    test('Should try to create a new session without any field', async () => {
      await api
        .post('/session')
        .expect(400)
    });
    
    test('Should try to get a unexistent session', async () => {
      await api
        .get('/session')
        .expect(404)
    });

    test('Should try to delete a unexistent session', async () => {
      await api
        .delete('/session')
        .expect(404)
    });

  });
});

/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});