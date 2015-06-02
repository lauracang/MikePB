'use strict';

/**
 * Module dependencies.
 */

// gulp

var gulp = require('gulp');
var cordova = require('cordova');

// gulp modules

var es = require('event-stream');

/**
 * Install dependencies.
 */

gulp.task('deps', function () {
  return es.merge(
    es.readable(function (count, done) {
      cordova.platform('add', 'android', function (err) {
        if (err && err.message != 'Platform android already added') {
          return done(err);
        }
        this.emit('end');
      }.bind(this));
    })
  );
});
