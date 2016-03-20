angular.module('game_jam.controllers')

.controller('WalkCtrl', function($scope, walking_services) {
	$scope.getBackgroundImg = function() {
		return walking_services.getBackgroundImg();
	}
});
