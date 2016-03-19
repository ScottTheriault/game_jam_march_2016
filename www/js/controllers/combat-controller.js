angular.module('game_jam.controllers')

.controller('CombatCtrl', function($scope, player_services) {
	$scope.testIt = function () {
		return player_services.testIt();
	}
});
