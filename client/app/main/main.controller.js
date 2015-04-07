'use strict';

function MainCtrl ($scope, $http, ArConnector) {
  this.messages = ArConnector.collection;
  //console.log(this.messages);
}

angular
  .module('arkaApp')
  .controller('MainCtrl', MainCtrl);
