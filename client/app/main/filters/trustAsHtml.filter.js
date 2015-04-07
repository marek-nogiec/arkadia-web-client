'use strict';

angular.module('arkaApp')
  .filter('trustAsHtml', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  });
