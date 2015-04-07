'use strict';

angular.module('arkaApp')
  .directive('arkaTerminal', function () {
    return {
      templateUrl: 'app/main/directives/arka-terminal/arka-terminal.html',
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
      }
    };
  });