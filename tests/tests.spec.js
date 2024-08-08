const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

describe('Auth API', () => {
  beforeAll((done) => {
    db.serialize(() => {
      db.run("DELETE FROM users");
      db.run("DELETE FROM tasks");
      done();
    });
  });

  test('Register a new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password'
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('Login with valid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Create a new task', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password'
    });
    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', token)
      .send({
        description: 'Test Task',
        priority: 'High'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('Get pending tasks', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password'
    });
    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
