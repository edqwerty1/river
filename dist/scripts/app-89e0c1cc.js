"use strict";angular.module("river",["ngAnimate","ngCookies","ngSanitize","ngResource","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl",reloadOnSearch:!1}).otherwise({redirectTo:"/"})}]),angular.module("river").directive("navBar",function(){return{restrict:"EA",scope:{},templateUrl:"app/components/navbar/navbar.html",controller:"NavbarController",controllerAs:"vm"}}),angular.module("river").controller("NavbarController",["twitchDataService","selectedGameService",function(e,a){var n=this;n.navCollapsed=!0,n.topGames=[],n.test="test",e.getTopGames().then(function(e){{var a=e.top,t=!0;a[0].game.name}angular.forEach(a,function(e){var a=e.game;n.topGames.push({name:a.name,logo:a.logo.medium,selected:t}),t&&(t=!1)})}),n.selectGame=function(e){angular.forEach(n.topGames,function(e){e.selected&&(e.selected=!1)}),e.selected=!0,a.updateSelectedGame(e.name)}}]),angular.module("river").directive("sideBar",function(){return{restrict:"EA",scope:{},templateUrl:"app/components/sidebar/sidebar.html",controller:"SidebarController",controllerAs:"sidebar"}}),angular.module("river").controller("SidebarController",["twitchDataService","selectedGameService",function(e,a){var n=this;n.channels=[],a.gameChanged.then(function(){},function(){},function(a){e.getChannels(a).then(function(e){var a=e.streams,t=!0;n.channels=[],angular.forEach(a,function(e){var a=e.channel,r=e.preview;n.channels.push({name:a.name,displayName:a.display_name,previewUrl:r.medium,status:a.status,viewers:e.viewers,selected:t}),t&&(t=!1)})})}),a.getGame()}]),angular.module("river").directive("channelPreview",["selectedGameService",function(e){return{restrict:"EA",scope:{channel:"="},templateUrl:"app/components/directives/channel-preview.html",link:function(a){a.selectChannel=function(a){e.updateSelectedChannel(a.name)}}}}]),function(){function e(e,a){function n(){var n=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/games/top?callback=JSON_CALLBACK").success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}function t(n){var t=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/search/streams?q="+encodeURI(n)+"&callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}function r(n){var t=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/streams/"+encodeURI(n)+"?callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}var i={getTopGames:n,getChannels:t,getStream:r};return i}var a="twitchDataService";angular.module("river").factory(a,["$http","$q",e])}(),function(){function e(e,a,n){function t(e){a.search("game",e),c.notify(e)}function r(e){a.search("channel",e),s.notify(e)}function i(){var e=n.game;void 0!==e&&""!==e&&c.notify(e)}function l(){var e=n.channel;void 0!==e&&""!==e&&s.notify(e)}var c=e.defer(),s=e.defer(),o={gameChanged:c.promise,channelChanged:s.promise,updateSelectedGame:t,updateSelectedChannel:r,getChannel:l,getGame:i};return o}var a="selectedGameService";angular.module("river").factory(a,["$q","$location","$routeParams",e])}(),angular.module("river").controller("MainCtrl",["$scope","twitchDataService","selectedGameService","$sce",function(e,a,n,t){var r=this,i=function(e){return r.title=e,a.getStream(e).then(function(e){return r.streamUrl=t.trustAsResourceUrl("http://www.twitch.tv/"+e.stream.channel.name+"/embed"),r.stream},function(e){r.error=e}),r.stream};n.channelChanged.then(function(){},function(){},function(e){i(e)}),r.toggleWrapper=function(){$("#wrapper").toggleClass("toggled")},n.getChannel()}]),angular.module("river").run(["$templateCache",function(e){e.put("app/main/main.html",'<div id="wrapper"><div side-bar=""></div><div nav-bar=""></div><div id="page-content-wrapper" ng-controller="MainCtrl as vm"><div class="container-fluid"><div class="row"><div class="widget wviolet"><div data-cc-widget-header="" title="{{vm.title}}"></div><div class="widget-content user"><h3>{{vm.title}}</h3><iframe class="videoplayer" src="{{vm.streamUrl}}" height="380px" width="620px" frameborder="0" scrolling="no"></iframe><div class="widget-foot"><div class="clearfix"></div></div></div></div></div><div class="row"><a href="" ng-click="vm.toggleWrapper()" class="btn btn-default" id="menu-toggle">Show Channels</a></div><hr><div class="footer"><p>River, get it, it is made up from lots of streams..</p></div></div></div></div>'),e.put("app/components/directives/channel-preview.html",'<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail"><img class="pull-right" ng-src="{{channel.previewUrl}}" alt="{{channel.name}}" ng-click="selectChannel(channel)"><div class="caption"><div>{{channel.displayName}}</div><div>{{channel.status}}</div><div>{{channel.viewers}}</div></div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-init="vm.navCollapsed = true" ng-click="vm.navCollapsed = !vm.navCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="container-fluid"><div class="collapse navbar-collapse" ng-class="!vm.navCollapsed && \'in\'" ng-click="vm.navCollapsed=true"><ul class="nav navbar-nav"><li ng-repeat="game in vm.topGames" ng-class="{active: game.selected}"><div class="thumbnail"><img class="pull-right" ng-src="{{game.logo}}" alt="{{game.name}}" ng-click="vm.selectGame(game)"><div class="caption"><h3><a href="" ng-click="vm.selectGame(game)">{{game.name}}</a></h3></div></div></li></ul></div></div></nav>'),e.put("app/components/sidebar/sidebar.html",'<div id="sidebar-wrapper"><ul class="sidebar-nav"><li class="sidebar-brand"><a href="#/">River</a></li><ul><li ng-repeat="channel in sidebar.channels" ng-class="{active: channel.selected}"><div channel-preview="" channel="channel"></div></li></ul></ul></div>')}]);