'use strict';

angular.module('river')
  .controller('StreamController', function (twitchDataService, $sce, selectedGameService  ) {
    var vm = this;

    var showChannel = function(channelName){
      vm.title = channelName;
      twitchDataService.getStream(channelName).then(function (data) {
          vm.streamUrl = $sce.trustAsResourceUrl('http://www.twitch.tv/' + data.stream.channel.name + '/embed');
          return vm.stream;
        },
        function (error) {
          vm.error = error;
        });
      return vm.stream;
    };


    showChannel(vm.channelName);

    vm.closeStream = function(){
      selectedGameService.removeChannel(vm.channelName);
    }

  });
