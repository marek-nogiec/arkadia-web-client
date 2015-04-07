'use strict';

function arkaTerminalInput (
  ArConnector
) {
  return {
    templateUrl: 'app/main/directives/arka-terminal-input/arka-terminal-input.html',
    restrict: 'E',
    replace: true,
    link: function (scope) {
      scope.sendMessage = function (message) {
        ArConnector.send(message);
      };
      scope.reconnect = function () {
        ArConnector.reconnect();
      }
    }
  };
}

angular
  .module('arkaApp')
  .directive('arkaTerminalInput', arkaTerminalInput);