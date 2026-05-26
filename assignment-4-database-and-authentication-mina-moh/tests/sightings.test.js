const request = require('supertest');
const app = require('../app.js')

it('responds with list', function(done){
  request(app)
    .get('/sightings')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends one record', function(done){
  request(app)
    .get('/sightings/DEVA-1358')
    .expect('Content-Type', /text/)
    .expect(200, done)
})

it('sends error if sighting not found', function(done){
  request(app)
    .get('/sightings/zzzzzzzz')
    .expect('Content-Type', /text/)
    .expect(404, done)
})

it('sends error if user is not authenticated', function(done){
  request(app)
    .post('/sightings')
    .expect('Content-Type', /text/)
    .expect(401, done)
})

it('sends error if required params are missing', function(done){
  request(app)
    .post('/sightings')
    .expect('Content-Type', /text/)
    .expect(422, done)
})

it('sends newly created record if create is successful', function(done){
  request(app)
    .post('/sightings')
    .expect('Content-Type', /text/)
    .expect(201, done)
})
