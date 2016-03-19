myApp = angular.module('game_jam.controllers', ['game_jam.util'])

.controller('AppCtrl', function($scope, $window) {
	$scope.getWindowHeight = function() {
		return $window.innerHeight;
	}
	$scope.getWindowWidth = function() {
		return $window.innerWidth;
	}
});
