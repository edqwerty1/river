'use strict';

angular.module('river')
  .directive('stream', function () {
    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: 'app/components/stream/stream.html',
      controller: 'StreamController',
      controllerAs: 'vm'
    }
  });
