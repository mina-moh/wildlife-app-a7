const request = require('supertest');
const app = require('../app.js')

it('responds with list', function(done){
  request(app)
    .get('/parks')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends one record', function(done){
  request(app)
    .get('/parks/EVER')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends error if park not found', function(done){
  request(app)
    .get('/parks/zzzzzzzz')
    .expect('Content-Type', /text/)
    .expect(404, done)
})
