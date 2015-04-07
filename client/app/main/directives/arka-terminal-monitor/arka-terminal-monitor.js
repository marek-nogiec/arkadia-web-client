'use strict';

angular.module('arkaApp')
  .directive('arkaTerminalMonitor', function () {
    return {
      templateUrl: 'app/main/directives/arka-terminal-monitor/arka-terminal-monitor.html',
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$on('receivedMessage', function() {
          $(element).scrollTop($(this).height())
        })
      }
    };
  });