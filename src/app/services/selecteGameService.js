(function () {
  'use strict';

  var serviceId = 'selectedGameService';
  angular.module('river').factory(serviceId,['$q', selectedGameService]);

  function selectedGameService($q) {
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
      gameChanged.notify(gameName);
    }

    function updateSelectedChannel(channelName) {
      channelChanged.notify(channelName);
    }

  }
})();
