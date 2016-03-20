angular.module('game_jam.controllers')

.controller('TextViewCtrl', function($scope, text_services, level_services) {
	$scope.getText = function() {
		return text_services.getText();
	}

	$scope.goNext = function() {
		var newIndex = text_services.next();

		if (newIndex === 0) {
			//TODO next level
		}
	}
});
