import mongoose from 'mongoose';
import * as supertest from 'supertest';
import { describe, test, afterAll, jest } from '@jest/globals';
import { newObjective } from './entidades';

const {app, server} = require('../src/index');
const api = supertest(app);


jest.setTimeout(10000);

describe('Objecive Model Test', () => {
  describe('Objecive`s endpoint OK test', () => {
    test('Should create a new objective that not exist', async () => {
      await api
        .post('/objective')
        .send(newObjective)
        .expect(201)
    });
    test('Should get a objective', async () => {
      await api
      .get('/objective')
      .query({name: newObjective.name,  session: newObjective.session.toString()})
      .expect(200)
    });
    test('Should delete a objective', async () => {
      await api
      .delete('/objective')
      .query({name: newObjective.name, session: newObjective.session.toString()})
      .expect(200)
    });
  });

  describe('Objective`s endpoint BAD REQUEST test', () => {
    test('Should try to post a objective withou any field', async () => {
      await api
        .post('/objective')
        .expect(500)
    });
    test('Should try to get a objective without any field', async () => {
      await api
      .get('/objective')
      .expect(404)
    });
    test('Should try delete a unexistent objective', async () => {
      await api
      .delete('/objective')
      .expect(404)
    });
  });

});

/** Cierro las conexiones */
afterAll(() => {
  server.close();
  mongoose.connection.close();
});