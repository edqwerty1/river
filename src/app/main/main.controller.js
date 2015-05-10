'use strict';

angular.module('river')
  .controller('MainCtrl', ['$scope','twitchDataService', function ($scope, twitchDataService) {
    $scope.awesomeThings = [
      {
        'title': 'Sass (Node)',
        'url': 'https://github.com/sass/node-sass',
        'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
        'logo': 'node-sass.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });

      twitchDataService.getTopGames().then(function (data) {
        var topGames = data.top;
        angular.forEach(topGames, function(gameDetails){
          var game = gameDetails.game;
          $scope.awesomeThings.push(
            {
              'title': game.name,
              'url': game.box.large,
              'description': 'games',
              'logo': game.logo.small
            }
          )
        })
      })
  }]);
