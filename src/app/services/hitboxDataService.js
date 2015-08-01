(function () {
  'use strict';

  var serviceId = 'hitboxDataService';
  angular.module('river').factory(serviceId, ['$http', '$q', dataService]);

  function dataService($http, $q) {
    var service = {
      getTopGames: getTopGames,
      getChannels: getChannels,
      getStream: getStream
    };

    return service;

    function getTopGames() {
      var deferred = new $q.defer();
     $http.get('https://api.hitbox.tv/games?limit=10&liveonly')
        .success(function (resp) {
          deferred.resolve(resp);
        }).error(function (error) {
          deferred.reject(error);
        });

      $http.get('https://api.hitbox.tv/game/dota-2')
        .success(function (resp) {
          deferred.resolve(resp);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function getChannels(game) {
      var deferred = new $q.defer();
      $http.jsonp('https://api.twitch.tv/kraken/search/streams?q=' + encodeURI(game) + '&callback=JSON_CALLBACK')
        .success(function (resp) {
          deferred.resolve(resp);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function getStream(channel) {
      var deferred = new $q.defer();
      $http.jsonp('https://api.twitch.tv/kraken/streams/' + encodeURI(channel) + '?callback=JSON_CALLBACK')
        .success(function (resp) {
          deferred.resolve(resp);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
})();
