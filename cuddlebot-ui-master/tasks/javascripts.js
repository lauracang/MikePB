'use strict';

/**
 * Module dependencies.
 */

var es = require('event-stream');
var notifier = require('node-notifier');
var webpack = require('webpack');
var webpackOptions = require('../webpack.conf.js');

// gulp

var gulp = require('gulp');

// gulp modules

var changed = require('gulp-changed');
var gutil = require('gulp-util');
var gwebpack = require('gulp-webpack');
var report = require("gulp-notify/lib/report");

/**
 * Detect production.
 */

var production = process.env.NODE_ENV == 'production';

/**
 * Set output filename.
 */

webpackOptions.output = {
  filename: 'app.js'
};

/**
 * Combine JavaScript files.
 */

gulp.task('js', function () {
  return gulp.src('app/start.js')
    .pipe(gwebpack(webpackOptions, null, done))
    .pipe(gulp.dest('www/js'));
});

/**
 * Watch JavaScript files for changes.
 */

gulp.task('watch-js', function () {
  gulp.src('app/start.js')
    .pipe(gwebpack({
      __proto__: webpackOptions,
      watch: true
    }, null, done))
    .pipe(gulp.dest('www/js'));
});

/**
 * Force gulp-webpack to send notifications.
 *
 * @param err Error
 * @param stats
 * @api private
 */

function done (err, stats) {
  var options = webpackOptions;
  var callingDone = false;

  if (options.quiet || callingDone) return;
  // Debounce output a little for when in watch mode
  if (options.watch) {
    callingDone = true;
    setTimeout(function() { callingDone = false; }, 500);
  }

  var message = 'Finished compiling JavaScript files.';
  if (err || (err = stats.compilation.errors[0])) {
    message = err;
  }

  if (options.verbose) {
    gutil.log(stats.toString({
      colors: true,
    }));
  } else {
    gutil.log(stats.toString({
      colors:       (options.stats && options.stats.colors)       || true,
      hash:         (options.stats && options.stats.hash)         || false,
      timings:      (options.stats && options.stats.timings)      || false,
      assets:       (options.stats && options.stats.assets)       || true,
      chunks:       (options.stats && options.stats.chunks)       || false,
      chunkModules: (options.stats && options.stats.chunkModules) || false,
      modules:      (options.stats && options.stats.modules)      || false,
      children:     (options.stats && options.stats.children)     || true,
    }));
  }

  report(notifier.notify.bind(notifier), message, {
    title: "Webpack"
  });
}
