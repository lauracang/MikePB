'use strict';

/**
 * Module dependencies.
 */

var gulp = require('gulp');

/**
 * Environment config.
 */

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

/**
 * Define tasks.
 */

require('./tasks/assets');
require('./tasks/dependencies');
require('./tasks/javascripts');
require('./tasks/stylesheets');

/**
 * Define build task.
 */

gulp.task('build', [
  'assets',
  'css',
  'js']);

/**
 * Define watch task.
 */

gulp.task('watch', [
  'watch-assets',
  'watch-css',
  'watch-js']);

/**
 * Define default task as 'build'.
 */

gulp.task('default', ['build']);
