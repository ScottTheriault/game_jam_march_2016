myApp = angular.module('game_jam.controllers', ['game_jam.util'])

.controller('AppCtrl', function($scope, $window, $state, level_services) {
	$scope.getWindowHeight = function() {
		return $window.innerHeight;
	}
	$scope.getWindowWidth = function() {
		return $window.innerWidth;
	}

	$scope.goNextLevel = function() {
		var nextState = level_services.prepareNextLevelGetState();
		$state.go(nextState);
	}

	$scope.goMain = function() {
		$state.go('tab.main_menu');
	}
});
