(function () {
  'use strict';

  var serviceId = 'twitchDataService';
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
      $http.jsonp('https://api.twitch.tv/kraken/games/top?callback=JSON_CALLBACK')
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
