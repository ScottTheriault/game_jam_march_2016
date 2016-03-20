angular.module('game_jam.enemy_services', ['common.services'])

.factory('enemy_services', ['utility', 'item_services', function(utility, item_services) {
	var enemies =
			[
				{
					id: 0,
					name: 'evil ball',
					level: 1,
					head: item_services.getById(3)
				},
				{
					id: 1,
					name: 'orc warrior',
					level: 5,
					head: item_services.getById(16)
				},
				{
					id: 2,
					name: 'orc ranger',
					level: 5,
					head: item_services.getById(17)
				},
				{
					id: 3,
					name: 'orc mage',
					level: 5,
					head: item_services.getById(18)
				}
			];
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(enemies[id]))
		}
	}
}]);