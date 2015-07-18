'use strict';

angular.module('river')
  .controller('SidebarController', function (twitchDataService, selectedGameService) {
    var vm = this;

    vm.channels = [];

    selectedGameService.gameChanged.then(function(){}, function(){}, function(gameName){

      twitchDataService.getChannels(gameName).then(function (data) {
        var channels = data.streams;
        var selected = true;
        vm.channels = [];
        angular.forEach(channels, function(channelDetails){
          var channel = channelDetails.channel;
          var preview = channelDetails.preview;
          vm.channels.push(
            {
              'name': channel.name,
              'displayName': channel.display_name,
              'previewUrl': preview.medium,
              'status': channel.status,
              'viewers': channelDetails.viewers,
              'selected': selected
            });
          if (selected){
            selected = false;
          }

        })
      })
    });



  });
