angular.module('game_jam.level_services', ['common.services'])

.factory('level_services', ['utility', function(utility) {
	var levels = [];
	var index = 0;

	return {
		newGame: function() {
			index = 0;
		},
		prepareNextLevelGetState: function() {
			return 'tab.text_view'
		}
	}
}]);