'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      __dirname + '/src/screens/index.js'
    ]
  },
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.bundle.js',
    publicPath: 'http://localhost:8080/public/'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-2', 'react-hmre']
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
