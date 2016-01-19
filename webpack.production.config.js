(() => {
  'use strict';

  var webpack = require('webpack');
  var path = require('path');
  let buildPath = path.resolve(__dirname, 'public', 'build');
  var nodeModulesPath = path.resolve(__dirname, 'node_modules');
  let pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');
  let pathToReactDOM = path.resolve(
    nodeModulesPath,
    'react-dom/dist/react-dom.min.js');
  let mainPath = path.resolve(__dirname, 'app', 'main.js');

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
    devtool: 'source-map',
    // output config
    output: {
      path: buildPath, // Path of output file
      filename: 'bundle.js' // Name of output file
    },
    plugins: [
      // Minify the bundle
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // supresses warnings, usually from module minification
          warnings: false
        }
      }),
      // Allows error warnings but does not stop compiling. Will remove when eslint is added
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.(js|jsx)$/, // All .js and .jsx files
        loader: 'babel', // babel loads jsx and es6-7
        exclude: [nodeModulesPath],
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }],
      noParse: [pathToReact]
    }
  };

  module.exports = config;
})();
