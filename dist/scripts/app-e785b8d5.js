"use strict";angular.module("river",["ngAnimate","ngCookies","ngSanitize","ngResource","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl",reloadOnSearch:!1}).otherwise({redirectTo:"/"})}]),angular.module("river").directive("stream",function(){return{restrict:"EA",scope:{channelName:"="},templateUrl:"app/components/stream/stream.html",controller:"StreamController",controllerAs:"vm",bindToController:!0}}),angular.module("river").controller("StreamController",["twitchDataService","$sce","selectedGameService",function(e,n,a){var t=this,r=function(a){return t.title=a,e.getStream(a).then(function(e){return t.streamUrl=n.trustAsResourceUrl("http://www.twitch.tv/"+e.stream.channel.name+"/embed"),t.stream},function(e){t.error=e}),t.stream};r(t.channelName),t.closeStream=function(){a.removeChannel(t.channelName)}}]),angular.module("river").directive("sideBar",function(){return{restrict:"EA",scope:{},templateUrl:"app/components/sidebar/sidebar.html",controller:"SidebarController",controllerAs:"sidebar"}}),angular.module("river").controller("SidebarController",["twitchDataService","selectedGameService",function(e,n){var a=this;a.channels=[],n.gameChanged.then(function(){},function(){},function(t){e.getChannels(t).then(function(e){var t=e.streams;a.channels=[];var r=n.getChannels();angular.forEach(t,function(e){var n=e.channel,t=e.preview;a.channels.push({name:n.name,displayName:n.display_name,previewUrl:t.medium,status:n.status,viewers:e.viewers,selected:-1!==r.indexOf(n.name)})})})}),n.getGame()}]),angular.module("river").directive("navBar",function(){return{restrict:"EA",scope:{},templateUrl:"app/components/navbar/navbar.html",controller:"NavbarController",controllerAs:"vm"}}),angular.module("river").controller("NavbarController",["twitchDataService","selectedGameService","hitboxDataService",function(e,n){var a=this;a.navCollapsed=!0,a.topGames=[],a.test="test",e.getTopGames().then(function(e){{var n=e.top,t=!0;n[0].game.name}angular.forEach(n,function(e){var n=e.game;a.topGames.push({name:n.name,logo:n.logo.small,selected:t}),t&&(t=!1)})}),a.selectGame=function(e){angular.forEach(a.topGames,function(e){e.selected&&(e.selected=!1)}),e.selected=!0,n.updateSelectedGame(e.name)}}]),angular.module("river").directive("channelPreview",["selectedGameService",function(e){return{restrict:"EA",scope:{channel:"="},templateUrl:"app/components/directives/channel-preview.html",link:function(n){n.selectChannel=function(n){n.selected?e.removeChannel(n.name):e.updateSelectedChannel(n.name),n.selected=!n.selected},e.channelRemoved.then(function(){},function(){},function(e){e===n.channel.name&&(n.channel.selected=!1)})}}}]),function(){function e(e,n){function a(){var a=new n.defer;return e.jsonp("https://api.twitch.tv/kraken/games/top?callback=JSON_CALLBACK").success(function(e){a.resolve(e)}).error(function(e){a.reject(e)}),a.promise}function t(a){var t=new n.defer;return e.jsonp("https://api.twitch.tv/kraken/search/streams?q="+encodeURI(a)+"&callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}function r(a){var t=new n.defer;return e.jsonp("https://api.twitch.tv/kraken/streams/"+encodeURI(a)+"?callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}var c={getTopGames:a,getChannels:t,getStream:r};return c}var n="twitchDataService";angular.module("river").factory(n,["$http","$q",e])}(),function(){function e(e,n,a){function t(e){n.search("game",e),o.notify(e)}function r(e){-1==m.indexOf(e)&&m.push(e),n.search("channel",m),v.notify(e)}function c(e){var a=m.indexOf(e);-1!==a&&m.splice(a,1),n.search("channel",m),d.notify(e)}function l(){var e=a.game;void 0!==e&&""!==e&&o.notify(e)}function i(){var e=a.channel;void 0!==e&&e!==[]&&(e.constructor!==Array&&(e=[e]),angular.forEach(e,function(e){v.notify(e)}),m=e)}function s(){return m}var o=e.defer(),v=e.defer(),d=e.defer(),m=[],u={gameChanged:o.promise,channelChanged:v.promise,channelRemoved:d.promise,updateSelectedGame:t,updateSelectedChannel:r,removeChannel:c,getChannel:i,getGame:l,getChannels:s};return u}var n="selectedGameService";angular.module("river").factory(n,["$q","$location","$routeParams",e])}(),function(){function e(e,n){function a(){var a=new n.defer;return e.get("https://api.hitbox.tv/games?limit=10&liveonly").success(function(e){a.resolve(e)}).error(function(e){a.reject(e)}),e.get("https://api.hitbox.tv/game/dota-2").success(function(e){a.resolve(e)}).error(function(e){a.reject(e)}),a.promise}function t(a){var t=new n.defer;return e.jsonp("https://api.twitch.tv/kraken/search/streams?q="+encodeURI(a)+"&callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}function r(a){var t=new n.defer;return e.jsonp("https://api.twitch.tv/kraken/streams/"+encodeURI(a)+"?callback=JSON_CALLBACK").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}var c={getTopGames:a,getChannels:t,getStream:r};return c}var n="hitboxDataService";angular.module("river").factory(n,["$http","$q",e])}(),angular.module("river").controller("MainCtrl",["selectedGameService",function(e){var n=this;n.channels=[],e.channelChanged.then(function(){},function(){},function(e){-1==n.channels.indexOf(e)&&n.channels.push(e),console.log("main added "+e)}),e.channelRemoved.then(function(){},function(){},function(e){var a=n.channels.indexOf(e);-1!==a&&n.channels.splice(a,1),console.log("main removed "+e)}),n.toggleWrapper=function(){$("#wrapper").toggleClass("toggled")},n.getStreamClass=function(){switch(n.channels.length){case 1:return"col-md-12 col-lg-12";case 2:return"col-md-6 col-lg-6";default:return"col-md-6 col-lg-4"}},e.getChannel()}]),angular.module("river").run(["$templateCache",function(e){e.put("app/main/main.html",'<div id="wrapper"><div side-bar=""></div><div nav-bar=""></div><div id="page-content-wrapper" ng-controller="MainCtrl as vm"><div class="container-fluid"><div class="row"><div ng-repeat="c in vm.channels"><div ng-class="vm.getStreamClass()" stream="" channel-name="c"></div></div></div><div class="row"><a href="" ng-click="vm.toggleWrapper()" class="btn btn-default" id="menu-toggle">Show Channels</a></div><hr><div class="footer"><p>River, get it, it is made up from lots of streams..</p></div></div></div></div>'),e.put("app/components/directives/channel-preview.html",'<div class="row"><div class="thumbnail"><div class="container-channel"><img height="106px" width="190px" ng-src="{{channel.previewUrl}}" alt="{{channel.name}}" ng-click="selectChannel(channel)"> <input class="checkbox-channel" type="checkbox" ng-model="channel.selected"></div><div class="caption"><div>{{channel.displayName}}</div><div style="white-space: nowrap; overflow-x: hidden">{{channel.status}}</div><div>{{channel.viewers}}</div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-init="vm.navCollapsed = true" ng-click="vm.navCollapsed = !vm.navCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="container-fluid"><div class="collapse navbar-collapse" ng-class="!vm.navCollapsed && \'in\'" ng-click="vm.navCollapsed=true"><ul class="nav navbar-nav"><li ng-repeat="game in vm.topGames" ng-class="{active: game.selected}"><div class="col-sm-12"><img ng-src="{{game.logo}}" alt="{{game.name}}" ng-click="vm.selectGame(game)"> <a href="" ng-click="vm.selectGame(game)">{{game.name}}</a></div></li></ul></div></div></nav>'),e.put("app/components/sidebar/sidebar.html",'<div id="sidebar-wrapper"><ul class="sidebar-nav"><li class="sidebar-brand"><a href="#/">River</a></li><ul><li ng-repeat="channel in sidebar.channels" ng-class="{active: channel.selected}"><div channel-preview="" channel="channel"></div></li></ul></ul></div>'),e.put("app/components/stream/stream.html",'<div class="row"><div class="widget wviolet stream-wrapper"><div data-cc-widget-header="" title="{{vm.title}}"><span class="stream-header pull-left">{{vm.title}}</span> <span><a href="" ng-click="vm.closeStream()" class="btn btn-default pull-right">Close</a></span></div><div class="row"></div><div class="widget-content user"><div class="h_iframe"><iframe class="videoplayer" src="{{vm.streamUrl}}" height="400" width="2" frameborder="0" scrolling="no" allowfullscreen=""></iframe></div><div class="widget-foot"><div class="clearfix"></div></div></div></div></div>')}]);