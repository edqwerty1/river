'use strict';

angular.module('river')
  .directive('stream', function () {
    return {
      restrict: 'EA',
      scope: {
        channelName: '='
      },
      templateUrl: 'app/components/stream/stream.html',
      controller: 'StreamController',
      controllerAs: 'vm'
    }
  });
