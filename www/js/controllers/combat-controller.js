angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, combat_services, player_services, enemy_services) {
	/*player_services.setKnight();
	player_services.setRanger();
	player_services.setMage();

	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));*/

	$scope.MOVE_ATTACK = combat_services.attackToggle();
	$scope.MOVE_FIRE = combat_services.fireToggle();
	$scope.MOVE_LIGHTNING = combat_services.lightningToggle();

	combat_services.newCombat('img/background/combat/background_forest.png');

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

	$scope.toggleMove = function(move) {
		combat_services.moveToggle(move);
	}

	$scope.isActiveMove = function(move) {
		return combat_services.getToggledMove() === move;
	}

	$scope.attackTarget = function(player) {
		combat_services.attackTarget(player);
	}

	$scope.getCombatOverString = function() {
		return combat_services.getCombatOverString();
	}
});
