(function () {
  'use strict';

  var serviceId = 'selectedGameService';
  angular.module('river').factory(serviceId,['$q','$location', selectedGameService]);

  function selectedGameService($q, $location) {
    var gameChanged = $q.defer();
    var channelChanged = $q.defer();

    var service = {
      gameChanged: gameChanged.promise,
      channelChanged: channelChanged.promise,
      updateSelectedGame: updateSelectedGame,
      updateSelectedChannel: updateSelectedChannel
    };

    return service;

    function updateSelectedGame(gameName) {
      $location.path(gameName, false);
      gameChanged.notify(gameName);
    }

    function updateSelectedChannel(channelName) {
      $location.path(channelName, false);
      channelChanged.notify(channelName);
    }

  }
})();
