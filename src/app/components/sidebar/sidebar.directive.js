'use strict';

angular.module('river')
  .directive('sideBar', function () {
    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: 'app/components/sidebar/sidebar.html',
      controller: 'SidebarController',
      controllerAs: 'sidebar'
    }
  });
