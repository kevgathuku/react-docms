(() => {
  'use strict';

  var webpack = require('webpack');
  var path = require('path');
  let ExtractTextPlugin = require('extract-text-webpack-plugin');
  let buildPath = path.resolve(__dirname, 'public', 'build');
  var nodeModulesPath = path.resolve(__dirname, 'node_modules');
  let pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');
  let pathToReactDOM = path.resolve(
    nodeModulesPath,
    'react-dom/dist/react-dom.min.js');
  let mainPath = path.resolve(__dirname, 'app', 'main.js');
  let commonLoaders = require('./commonLoaders');

  var config = {
    entry: [mainPath],
    resolve: {
      // node_modules: ["web_modules", "node_modules"]  (Default Settings)
      alias: {
        'react': pathToReact,
        'react-dom': pathToReactDOM
      }
    },
    target: 'web',
    // Render source-map file for final build
    devtool: 'cheap-module-source-map',
    // output config
    output: {
      path: buildPath, // Path of output file
      filename: 'bundle.js', // Name of output file
      publicPath: '/build/'
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      // Minify the bundle
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // supresses warnings, usually from module minification
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // Allows error warnings but does not stop compiling. Will remove when eslint is added
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: commonLoaders,
      noParse: [pathToReact]
    }
  };

  module.exports = config;
})();
