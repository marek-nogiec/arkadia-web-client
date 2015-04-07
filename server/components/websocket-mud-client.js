'use strict';

var WebSocketServer = require('ws').Server;
var MudConnection = require('./telnet-mud-connection');
var MudResponse = require('./mud-response');
var messageTypes = require('./constants/message-types');

var bufferWithControlChars = function (buffer) {
  return (
  buffer[0] === 255 &&
  buffer[1] !== 255)
};

var sendInitialWebsocketResponse = function (ws) {
  var resp = {message: 'Initial', type: messageTypes.SYSTEM};
  ws.send(JSON.stringify(resp));
};

var wss;

var initialize = function(server) {
  wss = new WebSocketServer({server: server, path: "/ws"});
  wss.on('connection', connectionHandler.bind(this));
};

var connectionHandler = function connection(ws) {
  sendInitialWebsocketResponse(ws);

  ws.sendStandardMessage = function (message) {
    try {
      ws.send(JSON.stringify({message: message, type: messageTypes.STANDARD}));
    } catch (e) {
      console.log(e);
    }
  };

  ws.sendSystemMessage = function (message) {
    try {
      ws.send(JSON.stringify({message: message, type: messageTypes.SYSTEM}));
    } catch (e) {
      console.log(e);
    }
  };


  var opts = {
    ws: ws,
    host: 'arkadia.rpg.pl',
    port: 23
  };

  var mudConnection = new MudConnection(opts);

  mudConnection.on('data', function (buffer) {
    if (bufferWithControlChars(buffer)) {
      mudConnection.negotiate(this, buffer);
    } else {
      var output = new MudResponse(buffer.toString('ascii')).getResponseText();
      ws.sendStandardMessage(output);
    }
  });

  mudConnection.on('close', function () {
    ws.sendSystemMessage('Connection closed.');
  });

  mudConnection.on('timeout', function () {
    ws.sendSystemMessage('Connection timeout.');
  });

  mudConnection.on('error', function (e) {
    ws.sendSystemMessage('Error: ' + e);
  });

  ws.on('message', function (message) {
    mudConnection.sendMessage(message);
  });

  wss.on('close', function () {
    mudConnection.close();
  })
};

module.exports = initialize;