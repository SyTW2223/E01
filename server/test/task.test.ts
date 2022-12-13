import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { Task } from '../src/models/task';
import { test, afterAll } from '@jest/globals';

const {app, server} = require('../src/index');
const api = supertest(app);

test('Should create a new task', async () => {
  const task = new Task({
    name: 'task test'
  }); 

  await api
    .post('/user')
    .send(task)
    .expect(200)
});


/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});