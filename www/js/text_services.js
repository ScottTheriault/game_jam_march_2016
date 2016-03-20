angular.module('game_jam.text_services', ['common.services'])

.factory('text_services', ['utility', function(utility) {
	var textStream = [];
	var index = 0;
	return {
		setNewGameText: function() {
			textStream = [
				"Welcome Sir. Edward, the mythical dragon Qenoff is attacking! Take your brother Alphonse and the trusted LaFawnduh",
				"Only with the power of teamwork will you manage to defeat Qenoff"
			]
			index = 0;
		},
		getText: function() {
			return textStream[index];
		}
	}
}]);