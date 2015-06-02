'use strict';

/**
 * Module dependencies.
 */

// gulp

var gulp = require('gulp');

// gulp modules

var less = require('gulp-less');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Detect production.
 */

var production = process.env.NODE_ENV == 'production';

/**
 * Compile stylesheets files to CSS.
 */

gulp.task('css', function () {
  return gulp.src('app/styles/*.less', {
      base: 'app/styles'
    })
    .pipe(sourcemaps.init())
    .pipe(less({
      compress: production
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/css'))
    .pipe(notify({
      title: "LessCSS",
      message: "Finished compiling CSS files.",
      onLast: true
    }))
    .on('error', notify.onError("LessCSS: <%= error.message %>"));
});

/**
 * Watch stylesheets for changes.
 */

gulp.task('watch-css', ['css'], function () {
  gulp.watch('app/styles/**/*.less', ['css']);
});
