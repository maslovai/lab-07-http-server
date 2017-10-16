'use strict';

const expect = require('expect');
const request = require('superagent');
const server = require('../server.js');

const PORT = 8000;
const host = 'localhost:' + PORT;

describe('our first http server', function() {
  before(function(done) {
    server.listen(PORT, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should respond to a get request', function(done) {
    request
      .get(host + '/')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  });


  it('should process query params', function(done) {
    request
      .get(host + '/cowsay?text=hello')
      .end((err, res) => {
        expect(err).toBe(null);

        expect(res.status).toBe(200);
        done();
      });
  });



  // it('should error on bad JSON', function(done) {
  //   request
  //     .post(host + '/api/cowsay')
  //     .send('{"content":"json}')
  //     .end((err, res) => {
  //       expect(err).not.toBe(null);
  //       expect(res.text).toBe('I need something good to say');
  //       done();
  //     });
  // });

  it('should give a 404 on a bad url', function(done) {
    request
      .get(host + '/wrong')
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.text).toBe('address not found');
        done();
      });
  });
});
