require('babel-register')();

var jsdom = require('jsdom').jsdom;
var localStorage =  require('localStorage');
var sessionstorage =  require('sessionstorage');

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = localStorage;
global.window.sessionstorage = sessionstorage;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
