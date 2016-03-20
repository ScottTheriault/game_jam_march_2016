angular.module('game_jam.controllers')

.controller('MainMenuCtrl', function($scope) {
	$scope.showLoadGames = false;

	$scope.getBackgroundImg = function() {
		return 'img/background/combat/background_forest.png';
	}

	$scope.toggleShowLoadGames = function() {
		$scope.showLoadGames^=1;
	}
});
