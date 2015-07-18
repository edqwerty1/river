"use strict";angular.module("river",["ngAnimate","ngCookies","ngSanitize","ngResource","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("river").controller("SidebarController",["twitchDataService","selectedGameService",function(e,a){var n=this;n.channels=[],a.gameChanged.then(function(){},function(){},function(a){e.getChannels(a).then(function(e){var a=e.streams,t=!0;n.channels=[],angular.forEach(a,function(e){var a=e.channel,i=e.preview;n.channels.push({name:a.name,displayName:a.display_name,previewUrl:i.medium,status:a.status,viewers:e.viewers,selected:t}),t&&(t=!1)})})})}]),angular.module("river").controller("NavbarCtrl",["twitchDataService","selectedGameService",function(e,a){var n=this;n.navCollapsed=!0,n.topGames=[],n.test="test",e.getTopGames().then(function(e){var t=e.top,i=!0,r=t[0].game.name;angular.forEach(t,function(e){var a=e.game;n.topGames.push({name:a.name,logo:a.logo.medium,selected:i}),i&&(i=!1)}),a.updateSelectedGame(r)}),n.selectGame=function(e){angular.forEach(n.topGames,function(e){e.selected&&(e.selected=!1)}),e.selected=!0,a.updateSelectedGame(e.name)}}]),angular.module("river").directive("channelPreview",["selectedGameService",function(e){return{restrict:"EA",scope:{channel:"="},templateUrl:"app/components/directives/channel-preview.html",link:function(a){a.selectChannel=function(a){e.updateSelectedChannel(a.name)}}}}]),angular.module("river").controller("MainCtrl",["$scope","twitchDataService","selectedGameService","$sce",function(e,a,n,t){var i=this;n.channelChanged.then(function(){},function(){},function(e){return i.title=e,a.getStream(e).then(function(e){return i.streamUrl=t.trustAsResourceUrl("http://www.twitch.tv/"+e.stream.channel.name+"/embed"),i.stream},function(e){i.error=e}),i.stream}),i.toggleWrapper=function(){$("#wrapper").toggleClass("toggled")}}]),function(){function e(e,a){function n(){var n=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/games/top?callback=JSON_CALLBACK").success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}function t(n){var t=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/search/streams?q="+encodeURI(n)+"&callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}function i(n){var t=new a.defer;return e.jsonp("https://api.twitch.tv/kraken/streams/"+encodeURI(n)+"?callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}var r={getTopGames:n,getChannels:t,getStream:i};return r}var a="twitchDataService";angular.module("river").factory(a,["$http","$q",e])}(),function(){function e(e){function a(e){t.notify(e)}function n(e){i.notify(e)}var t=e.defer(),i=e.defer(),r={gameChanged:t.promise,channelChanged:i.promise,updateSelectedGame:a,updateSelectedChannel:n};return r}var a="selectedGameService";angular.module("river").factory(a,["$q",e])}(),angular.module("river").run(["$templateCache",function(e){e.put("app/main/main.html",'<div id="wrapper"><div ng-include="\'app/components/sidebar/sidebar.html\'"></div><div ng-include="\'app/components/navbar/navbar.html\'"></div><div id="page-content-wrapper" ng-controller="MainCtrl as vm"><div class="container-fluid"><div class="row"><div class="widget wviolet"><div data-cc-widget-header="" title="{{vm.title}}"></div><div class="widget-content user"><h3>{{vm.title}}</h3><iframe class="videoplayer" src="{{vm.streamUrl}}" height="380px" width="620px" frameborder="0" scrolling="no"></iframe><div class="widget-foot"><div class="clearfix"></div></div></div></div></div><div class="row"><a href="" ng-click="vm.toggleWrapper()" class="btn btn-default" id="menu-toggle">Show Channels</a></div><hr><div class="footer"><p>River, get it, it is made up from lots of streams..</p></div></div></div></div>'),e.put("app/components/directives/channel-preview.html",'<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail"><img class="pull-right" ng-src="{{channel.previewUrl}}" alt="{{channel.name}}" ng-click="selectChannel(channel)"><div class="caption"><div>{{channel.displayName}}</div><div>{{channel.status}}</div><div>{{channel.viewers}}</div></div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl as vm"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-init="vm.navCollapsed = true" ng-click="vm.navCollapsed = !vm.navCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="container-fluid"><div class="collapse navbar-collapse" ng-class="!vm.navCollapsed && \'in\'" ng-click="vm.navCollapsed=true"><ul class="nav navbar-nav"><li ng-repeat="game in vm.topGames" ng-class="{active: game.selected}"><div class="thumbnail"><img class="pull-right" ng-src="{{game.logo}}" alt="{{game.name}}" ng-click="vm.selectGame(game)"><div class="caption"><h3><a href="" ng-click="vm.selectGame(game)">{{game.name}}</a></h3></div></div></li></ul></div></div></nav>'),e.put("app/components/sidebar/sidebar.html",'<div id="sidebar-wrapper" ng-controller="SidebarController as vm"><ul class="sidebar-nav"><li class="sidebar-brand"><a href="#/">River</a></li><ul><li ng-repeat="channel in vm.channels" ng-class="{active: channel.selected}"><div channel-preview="" channel="channel"></div></li></ul></ul></div>')}]);