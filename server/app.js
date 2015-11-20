/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    config  = require('./config/environment');


// Setup server
var app     = express();
// console.info(require('http'));
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports.io = io;
exports = module.exports = app;
