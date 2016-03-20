angular.module('game_jam.controllers')

.controller('MainMenuCtrl', function($scope, player_services, text_services, level_services) {
	$scope.showLoadGames = false;

	$scope.getBackgroundImg = function() {
		return 'img/background/combat/background_forest.png';
	}

	$scope.toggleShowLoadGames = function() {
		$scope.showLoadGames^=1;
	}

	$scope.newGame = function() {
		player_services.setKnight();
		player_services.setRanger();
		player_services.setMage();

		level_services.newGame();
		text_services.setNewGameText();
		$scope.goNextLevel();
	}
});
