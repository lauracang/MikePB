'use strict';

/**
 * Module dependencies.
 */

// gulp

var gulp = require('gulp');

// gulp modules

var changed = require('gulp-changed');
var es = require('event-stream');
var notify = require("gulp-notify");

/**
 * Copy assets to www folder.
 */

gulp.task('assets', function () {
  var app = gulp.src('app/assets/**/*', {
    base: 'app/assets'
  });
  var fontAwesome = gulp.src('node_modules/font-awesome/fonts/*', {
    base: 'node_modules/font-awesome'
  });
  return es.concat(app, fontAwesome)
    .pipe(changed('www'))
    .pipe(gulp.dest('www'))
    .on('error', notify.onError({
      title: 'Assets',
      message: '<%= error.message %>'
    }));
});

/**
 * Watch assets for changes.
 */

gulp.task('watch-assets', ['assets'], function () {
  gulp.watch('app/assets/**/*', ['assets']);
});
