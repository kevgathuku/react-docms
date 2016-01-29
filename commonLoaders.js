(() => {
  'use strict';

  let ExtractTextPlugin = require('extract-text-webpack-plugin');

  module.exports = [{
    test: /\.jsx?$/, // A regexp to test the require path. works for js or jsx
    loader: 'babel', // The module to load. "babel" is short for "babel-loader"
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }, {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  }, {
    test: /\.(png|jpg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=8192' // limit of 8kb
  }];

})();
