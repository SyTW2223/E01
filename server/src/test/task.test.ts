import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll, jest } from '@jest/globals';
import { newObjective, newSession, newTask, newUser } from './entidades';
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
  res = await api.post('/objective').send({ token: token, ...newObjective })
  res = await api.get('/objective').send({ token: token}).query({name: newObjective.name,  session: newObjective.session.toString()})
  newTask.objective = res.body[0]._id;
  
});

describe('Task Model Test', () => {
  describe('Task`s endpoint OK test', () => {
    test('Should create a new task that not exist', async () => {
      await api
        .post('/task')
        .send({ token: token, ...newTask })
        .expect(201)
    });
    test('Should get a task', async () => {
      await api
      .get('/task')
      .send({token: token})
      .query({name: newTask.name,  objective: newTask.objective.toString()})
      .expect(200)
    });
    test('Should delete a task', async () => {
      await api
      .delete('/task')
      .send({token: token})
      .query({name: newTask.name, objective: newTask.objective.toString()})
      .expect(200)
    });
  });

  describe('Objective`s endpoint BAD REQUEST test', () => {
    test('Should try to post a task withou any field', async () => {
      await api
        .post('/task')
        .send({token: token})
        .expect(404)
    });
    test('Should try to get a task without any field', async () => {
      await api
      .get('/task')
      .send({token: token})
      .expect(404)
    });
    test('Should try delete a unexistent task', async () => {
      await api
      .delete('/task')
      .send({token: token})
      .expect(404)
    });
  });

});

/** Cierro las conexiones */
afterAll( async() => {
  // Al borrar el user, se borra en cascada todo.
  await api.delete('/user').send({token: token}).query({ name: newUser.name })
  await server.close();
  await mongoose.connection.close();
});