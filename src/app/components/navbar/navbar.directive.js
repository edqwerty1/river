'use strict';

angular.module('river')
  .directive('navBar', function () {
    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'vm'
    }
  });
