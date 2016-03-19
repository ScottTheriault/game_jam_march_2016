angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, player_services) {
	player_services.setNewPlayer();

	$scope.testIt = function () {
		return player_services.getPlayers();
	}
});
