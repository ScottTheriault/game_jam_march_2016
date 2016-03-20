angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, combat_services, player_services, enemy_services) {
	player_services.setKnight();
	player_services.setNewPlayer();
	player_services.setNewPlayer();

	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));
	player_services.addEnemyPlayer(enemy_services.getById(0));

	$scope.MOVE_ATTACK = combat_services.attackToggle();
	$scope.MOVE_SPELL = combat_services.spellToggle();
	$scope.MOVE_SPECIAL = combat_services.specialToggle();

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
