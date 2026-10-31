const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

afterEach(() => {
  delete mongoose.connection.readyState; // remove any fake value set below
});

test('GET /api/health returns 503 when the database is not connected', async () => {
  const res = await request(app).get('/api/health');
  expect(res.statusCode).toBe(503);
  expect(res.body.db).toBe('down');
});

test('GET /api/health returns 200 when the database is connected', async () => {
  Object.defineProperty(mongoose.connection, 'readyState', {
    value: 1,
    configurable: true,
  });
  const res = await request(app).get('/api/health');
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('ok');
});