(function () {
  'use strict';

  var serviceId = 'selectedGameService';
  angular.module('river').factory(serviceId,['$q','$location', '$routeParams', selectedGameService]);

  function selectedGameService($q, $location, $routeParams) {
    var gameChanged = $q.defer();
    var channelChanged = $q.defer();
    var channelRemoved = $q.defer();
    var channels = [];

    var service = {
      gameChanged: gameChanged.promise,
      channelChanged: channelChanged.promise,
      channelRemoved: channelRemoved.promise,
      updateSelectedGame: updateSelectedGame,
      updateSelectedChannel: updateSelectedChannel,
      removeChannel: removeChannel,
      getChannel: getChannel,
      getGame: getGame
    };

    return service;

    function updateSelectedGame(gameName) {
      $location.search('game', gameName );
      gameChanged.notify(gameName);
    }

    function updateSelectedChannel(channelName) {
      if (channels.indexOf(channelName) == -1) {
        channels.push(channelName);
      }

      $location.search('channel', channels );
      channelChanged.notify(channelName);
    }

    function removeChannel(channelName){
      var index = channels.indexOf(channelName);
      if (index !== -1) {
        channels.splice(index, 1);
      }
      $location.search('channel', channels );
      channelRemoved.notify(channelName);
    }

    function getGame(){
      var gameName= $routeParams.game;

      if (gameName !== undefined && gameName !== ''){
        gameChanged.notify(gameName);
      }

    }

    function getChannel(){
      var tempChannels = $routeParams.channel;

      if (tempChannels !== undefined && tempChannels !== []){
        angular.forEach(tempChannels, function(channel){
          channelChanged.notify(channel);
        });

        channels = tempChannels;

      }

    }

  }
})();
