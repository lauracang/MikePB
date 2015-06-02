'use strict';

/**
 * Module dependencies.
 */

var webpackOptions = require('./webpack.conf.js');

/**
 * Karma configuration.
 */

module.exports = function(config) {
  config.set({

    frameworks: ['mocha'],

    files: [
      'test/*_test.js',
      'test/**/*_test.js'
    ],

    preprocessors: {
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack']
    },

    reporters: ['progress'],

    browsers: ['Chrome'],

    webpackOptions: webpackOptions,

    plugins: [
      require("karma-chrome-launcher"),
      require("karma-mocha"),
      require("karma-webpack")
    ]

  });
};
