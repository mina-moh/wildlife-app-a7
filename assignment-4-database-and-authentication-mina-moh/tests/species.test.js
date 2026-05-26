const request = require('supertest');
const app = require('../app.js')

it('responds with list', function(done){
  request(app)
    .get('/species')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends one record', function(done){
  request(app)
    .get('/species/DEVA-1358')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends error if species not found', function(done){
  request(app)
    .get('/species/zzzzzzzz')
    .expect('Content-Type', /text/)
    .expect(404, done)
})
