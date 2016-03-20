angular.module('game_jam.controllers')

.controller('WalkCtrl', function($scope, $timeout, walking_services, player_services, animation_services) {
	$scope.getBackgroundImg = function() {
		return walking_services.getBackgroundImg();
	}

	$scope.getPlayerArray = function() {
		return [player_services.getPlayers()[0]];
	}

	$scope.getEnemyArray = function() {
		return [walking_services.getEnemy()];
	}

	$scope.next = function() {
		if (walking_services.getEnemy() === null || walking_services.getEnemyDead()) {
			animation_services.walk($('#walkingPlayer'));
		}

		$timeout(function() {
			$scope.goNextLevel();
		}, 2000);
	}
});
