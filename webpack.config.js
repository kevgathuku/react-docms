(() => {
  'use strict';

  let path = require('path');
  let ExtractTextPlugin = require('extract-text-webpack-plugin');
  let Webpack = require('webpack');
  let nodeModulesPath = path.resolve(__dirname, 'node_modules');
  let pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.js');
  let pathToReactDOM = path.resolve(nodeModulesPath,
    'react-dom/dist/react-dom.js');
  let buildPath = path.resolve(__dirname, 'public', 'build');
  let mainPath = path.resolve(__dirname, 'app', 'main.js');

  module.exports = {
    // Makes sure errors in console map to the correct file and line number
    devtool: 'eval',
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      mainPath
    ],
    target: 'web',
    resolve: {
      alias: {
        'react': pathToReact,
        'react-dom': pathToReactDOM
      }
    },
    output: {
      //We use the buildPath as that points to where the files will eventually
      // be bundled in production
      path: buildPath,
      filename: 'bundle.js',
      // Everything related to Webpack should go through a build path,
      // localhost:3000/build. That makes proxying easier to handle
      // The path where the bundled file is going to be accessed from the browser
      publicPath: 'http://localhost:8080/build/'
    },
    module: {
      preLoaders: [{
        // Eslint loader
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModulesPath]
      }],
      loaders: [{
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
      }],
      noParse: [pathToReact, /node_modules\/json-schema\/lib\/validate\.js/]
    },
    // eslint config options. Part of the eslint-loader package
    eslint: {
      configFile: '.eslintrc'
    },
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.NoErrorsPlugin()
    ]
  };
})();
