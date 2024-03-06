
const request = require('supertest');
const path = require('path');
const User = require('../models/UserModel');
const app = require('../server');


// const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => {
        const search = {
          muscle: 'biceps'
        }
        return request(app)
          .post('/api')
          .send(search)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/api/login', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => {
        const loginInfo = {
          email: 'kk@kk',
          password: 'kk',
        }
        return (request(app)
        .post('/api/login')
        .send(loginInfo)
        .expect('Content-Type', /application\/json/)
        .expect(200));
      });
  
      it('userDetail are in body of response', () => {
        const loginInfo = {
          email: 'kk@kk',
          password: 'kk',
        }
        const { email } = loginInfo;
        return (request(app)
          .post('/api/login')
          .send(loginInfo)
          .then((response) => {
            expect(response.body.userDetail).toBeDefined();
          })
        );
      });
    });
  });
});