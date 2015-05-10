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
          vm.channels.push(
            {
              'name': channel.name,
              'logo': channelDetails.preview.medium,
              'selected': selected
            });
          if (selected){
            selected = false;
          }

        })
      })
    });

    vm.selectChannel = function(channel){
      angular.forEach(vm.channels, function(r){
        if (r.selected){
          r.selected = false;
        }
      });
      vm.channels.selected = true;
      selectedGameService.updateSelectedChannel(channel.name);

    }

  });
