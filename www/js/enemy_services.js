angular.module('game_jam.enemy_services', ['common.services'])

.factory('enemy_services', ['utility', 'item_services', function(utility, item_services) {
	var enemies =
			[
				{
					id: 1,
					name: 'evil ball',
					level: 1,
					head: item_services.getById(3)
				}
			];
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(enemies[id]))
		}
	}
}]);