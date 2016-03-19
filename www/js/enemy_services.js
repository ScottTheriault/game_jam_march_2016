angular.module('game_jam.enemy_services', ['common.services'])

.factory('enemy_services', ['utility', function(utility) {
	var enemies =
			[
				
			];
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(enemies[id]))
		}
	}
}]);