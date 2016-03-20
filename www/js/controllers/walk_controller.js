angular.module('game_jam.controllers')

.controller('WalkCtrl', function($scope, walking_services, player_services) {
	$scope.getBackgroundImg = function() {
		return walking_services.getBackgroundImg();
	}

	$scope.getPlayerArray = function() {
		return [player_services.getPlayers()[0]];
	}

	$scope.next = function() {
	}
});
