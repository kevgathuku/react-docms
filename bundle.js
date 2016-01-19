/*eslint no-console: 0*/
(() => {
  'use strict';

  let Webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let webpackConfig = require('./webpack.config.js');

  module.exports = function() {
    // First we fire up Webpack an pass in the configuration we created
    let bundleStart = null;
    let compiler = Webpack(webpackConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', () => {
      console.log('Bundling...');
      bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', () => {
      console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    let bundler = new WebpackDevServer(compiler, {
      // We need to tell Webpack to serve our bundled application
      // from the build path. When proxying:
      // http://localhost:3000/build -> http://localhost:8080/build
      publicPath: '/build/',
      headers: { 'Access-Control-Allow-Origin': '*' },
      // Configure hot replacement
      hot: true,
      debug: true,
      // The rest is terminal configurations
      quiet: false,
      noInfo: true,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    bundler.listen(8080, 'localhost', () => {
      console.log('Bundling project, please wait...');
    });

  };

})();
