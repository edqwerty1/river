(function () {
  'use strict';

  var serviceId = 'selectedGameService';
  angular.module('river').factory(serviceId,['$q','$location', '$routeParams', selectedGameService]);

  function selectedGameService($q, $location, $routeParams) {
    var gameChanged = $q.defer();
    var channelChanged = $q.defer();

    var service = {
      gameChanged: gameChanged.promise,
      channelChanged: channelChanged.promise,
      updateSelectedGame: updateSelectedGame,
      updateSelectedChannel: updateSelectedChannel,
      getChannel: getChannel,
      getGame: getGame
    };

    return service;

    function updateSelectedGame(gameName) {
      $location.search('game', gameName );
      gameChanged.notify(gameName);
    }

    function updateSelectedChannel(channelName) {
      $location.search('channel', channelName );
      channelChanged.notify(channelName);
    }

    function getGame(){
      var gameName= $routeParams.game;

      if (gameName !== undefined && gameName !== ''){
        gameChanged.notify(gameName);
      }

    }

    function getChannel(){
      var channelName= $routeParams.channel;

      if (channelName !== undefined && channelName !== ''){
        channelChanged.notify(channelName);
      }

    }

  }
})();
