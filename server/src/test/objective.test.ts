import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, beforeAll, afterAll, jest } from '@jest/globals';
import { newObjective, newSession, newUser } from './entidades';
import { decodeToken } from '../authentication/token'

const {app, server} = require('../index');
const api = supertest(app);
jest.setTimeout(10000);
let token = ''

beforeAll( async () => {
  await api.post('/user').send(newUser)
  let res = await api.post('/user/login').send(newUser);
  token = res.body.token
  newSession.user = decodeToken(token).id
  res = await api.post('/session').send({token: token, ...newSession})
  res = await api.get('/session').send({token: token}).query({name: newSession.name, user: newSession.user.toString()})
  newObjective.session = res.body[0]._id;
});

describe('Objecive Model Test', () => {
  describe('Objecive`s endpoint OK test', () => {
    test('Should create a new objective that not exist', async () => {
      await api
        .post('/objective')
        .send({ token: token, ...newObjective })
        .expect(201)
    });
    test('Should get a objective', async () => {
      await api
      .get('/objective')
      .send({ token: token})
      .query({name: newObjective.name,  session: newObjective.session.toString()})
      .expect(200)
    });
    test('Should delete a objective', async () => {
      await api
      .delete('/objective')
      .send({token: token})
      .query({name: newObjective.name, session: newObjective.session.toString()})
      .expect(200)
    });
  });

  describe('Objective`s endpoint BAD REQUEST test', () => {
    test('Should try to post a objective withou any field', async () => {
      await api
        .post('/objective')
        .send({ token: token})
        .expect(404)
    });
    test('Should try to get a objective without any field', async () => {
      await api
      .get('/objective')
      .send({token: token})
      .expect(404)
    });
    test('Should try delete a unexistent objective', async () => {
      await api
      .delete('/objective')
      .send({token: token})
      .expect(404)
    });
  });

});

/** Cierro las conexiones */
afterAll( async() => {
  // Al borrar el user, se borra en cascada todo.
  await api.delete('/user').send({token: token}).query({ name: newUser.name })
  mongoose.connection.close();
  server.close();
});
