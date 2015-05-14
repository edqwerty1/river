'use strict';

angular.module('river')
  .controller('MainCtrl', function ($scope, twitchDataService, selectedGameService, $sce) {
    var vm = this;
    selectedGameService.channelChanged.then(function(){}, function(){}, function(channelName){
      vm.title = channelName;
      twitchDataService.getStream(channelName).then(function (data) {
          vm.streamUrl = $sce.trustAsResourceUrl('http://www.twitch.tv/' + data.stream.channel.name + '/embed');
          return vm.stream;
        },
        function (error) {
          vm.error = error;
        });
      return vm.stream;
    });

    vm.toggleWrapper = function(){
        $("#wrapper").toggleClass("toggled");
    }
  });
