const request = require('supertest');
const app = require('../app.js')

  it('responds with string', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, done)
  })
