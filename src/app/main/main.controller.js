'use strict';

angular.module('river')
  .controller('MainCtrl', function (selectedGameService) {
    var vm = this;

    vm.channels = [];
    selectedGameService.channelChanged.then(function(){}, function(){}, function(channelName) {
      if (vm.channels.indexOf(channelName) == -1) {
        vm.channels.push(channelName);
      }

      console.log('main added ' + channelName);
    });

    selectedGameService.channelRemoved.then(function(){}, function(){}, function(channelName) {
      var index = vm.channels.indexOf(channelName);
      if (index !== -1) {
        vm.channels.splice(index, 1);
      }

      console.log('main removed ' + channelName);
    });


    vm.toggleWrapper = function(){
        $("#wrapper").toggleClass("toggled");
    };

    vm.getStreamClass = function(){
      switch(vm.channels.length) {
        case 1:
        return "col-md-12 col-lg-12";
        break;
        case 2:
          return "col-md-6 col-lg-6";
          break;
        default:
          return "col-md-6 col-lg-4";
          break;
      }

    };

    selectedGameService.getChannel();

  });
