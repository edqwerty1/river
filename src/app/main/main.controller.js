'use strict';

angular.module('river')
  .controller('MainCtrl', function () {
    var vm = this;



    vm.toggleWrapper = function(){
        $("#wrapper").toggleClass("toggled");
    };


  });
