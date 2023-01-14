import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, jest } from '@jest/globals';
import { newSession, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const {app, server} = require('../index');
const api = supertest(app);

jest.setTimeout(10000);
let token = ''
beforeAll( async () => {
  await api.post('/user').send(newUser)
  const res = await api.post('/user/login').send(newUser);
  token = res.body.token
  newSession.user = decodeToken(token).id
});

describe('Session Model Test', () => {
  describe('Session OK test', () => {
    test('Should create a new session that not exist', async () => {
      await api
        .post('/session')
        .send({token: token, ...newSession})
        .expect(201)
    });
    
    test('Should get a session', async () => {
      await api
        .get('/session')
        .send({token: token})
        .query({name: newSession.name, user: newSession.user.toString()})
        .expect(200)
    });

    test('Should delete a session', async () => {
      await api
        .delete('/session')
        .send({token: token})
        .query({name: newSession.name, user: newSession.user.toString()})
        .expect(200)
    });

  });
  describe('Session BAD REQUEST test', () => {
    test('Should try to create a new session without any field', async () => {
      await api
        .post('/session')
        .send({token: token})
        .expect(500)
    });
    
    test('Should try to get a unexistent session', async () => {
      await api
        .get('/session')
        .send({token: token})
        .expect(404)
    });

    test('Should try to delete a unexistent session', async () => {
      await api
        .delete('/session')
        .send({token: token})
        .expect(404)
    });

  });
});

/** Cierro las conexiones */
afterAll( async() => {
  // Al borrar el user, se borra en cascada todo.
  await api.delete('/user').send({token: token}).query({ name: newUser.name })
  await mongoose.connection.close();
  server.close();
});