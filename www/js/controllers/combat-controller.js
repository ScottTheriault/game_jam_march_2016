angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, combat_services, player_services, enemy_services) {
	player_services.setNewPlayer();
	player_services.setNewPlayer();
	player_services.setNewPlayer();

	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));

	combat_services.newCombat('img/background/combat/simple_test.png');

	$scope.getBackgroundImg = function() {
		return combat_services.getBackgroundImg();
	}

	$scope.getPlayers = function() {
		return player_services.getPlayers();
	}

	$scope.getEnemies = function() {
		return player_services.getEnemies();
	}

	$scope.getTurns = function() {
		return combat_services.getTurns();
	}
});
