const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('API Integration Tests', () => {
  describe('GET /api/health', () => {
    it('should return 200 OK', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/protected', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/protected');
      expect(res.statusCode).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer valid-token');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('User API', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    }, 30000);

    it('should create a new user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const res = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(userData.name);
      expect(res.body.email).toBe(userData.email);
      
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
    });

    it('should get all users', async () => {
      await User.create({ name: 'Jane Doe', email: 'jane@example.com' });
      
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });
});
