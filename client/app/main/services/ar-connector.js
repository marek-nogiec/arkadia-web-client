function ArConnector ($websocket, $rootScope) {
  // Open a WebSocket connection
  var dataStream;

  var connect = function() {
    dataStream = $websocket('ws://localhost:9000/ws');

    dataStream.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
      $rootScope.$broadcast('receivedMessage');
    });
  };

  connect();

  var collection = [];


  var methods = {
    collection: collection,
    send: function(message) {
      dataStream.send(message)
    },
    reconnect: function() {
      connect();
    }

  };

  return methods;
}

angular
  .module('arkaApp')
  .service('ArConnector', ArConnector);