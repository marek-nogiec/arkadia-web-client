'use strict';

angular.module('arkaApp')
  .directive('test', function () {
    return {
      templateUrl: 'app/main/directives/test/test.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });