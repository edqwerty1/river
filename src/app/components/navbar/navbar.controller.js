'use strict';

angular.module('river')
  .controller('NavbarCtrl', function (twitchDataService) {
    var vm = this;

    vm.topGames = [];
    vm.test = "test";
    twitchDataService.getTopGames().then(function (data) {
      var topGames = data.top;
      var selected = true;
      angular.forEach(topGames, function(gameDetails){
        var game = gameDetails.game;
        vm.topGames.push(
          {
            'name': game.name,
            'logo': game.logo.medium,
            'selected': selected
          });
          if (selected){
            selected = false;
          };

      })
    })
  });
