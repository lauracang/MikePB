'use strict';

/**
 * Module dependencies.
 */

var webpack = require('webpack');

/**
 * WebPack configuration.
 */

var options = module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx$/,
      loader: 'jsx?harmony'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      React: 'react/addons'
    })
  ]
};

/**
 * Inject production plugins into WebPack options.
 */

if (process.env.NODE_ENV == 'production') {
  options.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  );
}

