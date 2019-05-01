'use strict';
const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Express App', () => {
  it('GET / should return a message', () => {
    return request(app)
      .get('/')
      .expect(200, 'Hey this is the homepage');
  });

  it('should return an array with all apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  it('should sort by Rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: ('Rating')})
      .expect(200)
      .expect('content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length -1) {
          sorted = res.body[i].Rating >= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  
  it('should sort by App', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'App'})
      .expect(200)
      .expect('content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length -1) {
          sorted = sorted && res.body[i].app < res.body[i + 1].app;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

});