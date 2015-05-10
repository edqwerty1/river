'use strict';

angular.module('river')
  .controller('NavbarCtrl', function (twitchDataService, selectedGameService) {
    var vm = this;

    vm.topGames = [];
    vm.test = "test";
    twitchDataService.getTopGames().then(function (data) {
      var topGames = data.top;
      var selected = true;
      var firstGameName = topGames[0].game.name;
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
        }

      });
      selectedGameService.updateSelectedGame(firstGameName);
    });

    vm.selectGame = function(game){
      angular.forEach(vm.topGames, function(topGame){
        if (topGame.selected){
          topGame.selected = false;
        }
      });
      game.selected = true;
      selectedGameService.updateSelectedGame(game.name);

    }
  });
