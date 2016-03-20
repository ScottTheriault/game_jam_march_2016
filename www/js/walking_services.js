angular.module('game_jam.walking_services', ['common.services', 'game_jam.item_services'])

.factory('walking_services', ['utility', 'item_services', 'enemy_services', function(utility, item_services, enemy_services) {
	var walkingLevels =
					[
						{
							backgroundImage: 'img/background/combat/background_forest.png',
							enemy_id: null,
							enemy: null,
							enemy_dead: false
						}
					]
	var level = {};
	var index = 0;
	return {
		setByIndex: function(i) {
			level = JSON.parse(JSON.stringify(walkingLevels[i]));
			if (level.enemy_id !== null) {
				console.log(level.enemy_id);
				level.enemy = enemy_services.getById(level.enemy_id);
				//TODO when dead
			}
			index = 0;
		},
		getBackgroundImg: function() {
			return level.backgroundImage;
		}
	}
}]);