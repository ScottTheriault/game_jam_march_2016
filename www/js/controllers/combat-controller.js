angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, combat_services, player_services) {
	player_services.setNewPlayer();
	combat_services.newCombat('img/background/combat/simple_test.png');

	$scope.testIt = function () {
		return player_services.getPlayers();
	}
});
