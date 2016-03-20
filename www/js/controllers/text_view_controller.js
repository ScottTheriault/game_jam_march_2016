angular.module('game_jam.controllers')

.controller('TextViewCtrl', function($scope, text_services) {
	$scope.getText = function() {
		return text_services.getText();
	}
});
