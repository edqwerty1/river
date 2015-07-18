'use strict';

angular.module('river')
  .directive('channelPreview', function (selectedGameService) {
    return {
      restrict: 'EA',
      scope: {
        channel: '='
      },
      templateUrl: 'app/components/directives/channel-preview.html',
      link: function(scope){
        scope.selectChannel = function(channel){
          selectedGameService.updateSelectedChannel(channel.name);

        }
      }

    };
  });
