import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, beforeAll } from '@jest/globals';
import { newTask } from './entidades';

const {app, server} = require('../src/index');
const api = supertest(app);


beforeAll(() => {
});

describe('Task Model Test', () => {
  describe('Objecive`s endpoint OK test', () => {
    test('Should create a new task that not exist', async () => {
      await api
        .post('/task')
        .send(newTask)
        .expect(201)
    });
    test('Should get a task', async () => {
      await api
      .get('/task')
      .query({name: newTask.name,  objective: newTask.objective.toString()})
      .expect(200)
    });
    test('Should delete a task', async () => {
      await api
      .delete('/task')
      .query({name: newTask.name, objective: newTask.objective.toString()})
      .expect(200)
    });
  });

  describe('Objective`s endpoint BAD REQUEST test', () => {
    test('Should try to post a task withou any field', async () => {
      await api
        .post('/task')
        .expect(500)
    });
    test('Should try to get a task without any field', async () => {
      await api
      .get('/task')
      .expect(404)
    });
    test('Should try delete a unexistent task', async () => {
      await api
      .delete('/task')
      .expect(404)
    });
  });

});

/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});