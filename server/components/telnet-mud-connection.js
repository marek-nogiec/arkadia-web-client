'use strict';


var messageTypes = require('./constants/message-types');
var TelnetUtils = require('./telnet-utils');
var Socket = require('net').Socket;

var socket = new Socket();


/**
 * Mud connection handler
 * @param opts
 * @constructor
 */
var MudConnection = function (opts) {
  this.port = opts.port;
  this.host = opts.host;

  socket.connect(this.port, this.host);
};

MudConnection.prototype.sendMessage = function (message) {
  socket.write(message + '\n');
};

MudConnection.prototype.close = function () {
  socket.close();
};

MudConnection.prototype.on = function (event, callback) {
  socket.on(event, callback);
};

MudConnection.prototype.negotiate = TelnetUtils.negotiate;

module.exports = MudConnection;