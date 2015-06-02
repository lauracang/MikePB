'use strict';

/**
 * Module dependencies.
 */

var assert = require("assert");
var WebWorker = require("../app/lib/web-worker");

/**
 * Test WebWorker.
 */

describe('WebWorker', function () {

  before(function () {
    this.subject = new WebWorker(function (message) {
      return 'echo: ' + message;
    });
  });

  describe('#push()', function () {

    it('should process one message', function (done) {
      this.subject.once('message', function (data) {
        assert.equal(data, 'echo: Hello World!');
        done();
      });
      this.subject.push('Hello World!');
    });

  });

});
