angular.module('game_jam.level_services', ['common.services'])

.factory('level_services', ['utility', 'text_services', 'walking_services', 'player_services', 'combat_services', 'enemy_services', function(utility, text_services, walking_services, player_services, combat_services, enemy_services) {
	var TEXT_VIEW = 'TEXT_VIEW';
	var WALKING = 'WALKING';
	var COMBAT = 'COMBAT';

	var levels =
		[
			{type: TEXT_VIEW, text_index: 0},
			{type: WALKING, walking_index: 0},
			{type: WALKING, walking_index: 1},
			{type: COMBAT, backgroundImage: 'img/background/combat/background_forest.png', enemy_ids: [1]}
		];
	var index = -1;

	function nextTextView() {
		text_services.setByIndex(levels[index].text_index);
		return 'tab.text_view';
	}

	function nextWalking() {
		walking_services.setByIndex(levels[index].walking_index);
		return 'tab.walk';
	}

	function nextCombat() {
		var level = levels[index];
		player_services.clearEnemies();

		for (var i = 0; i < level.enemy_ids.length; i++) {
			player_services.addEnemyPlayer(enemy_services.getById(level.enemy_ids[i]));
		}

		combat_services.newCombat(level.backgroundImage);
		return 'tab.combat';
	}

	return {
		newGame: function() {
			index = -1;
		},
		prepareNextLevelGetState: function() {
			index++;
			var level = levels[index];

			switch (level.type) {
				case TEXT_VIEW:
					return nextTextView();
				case WALKING:
					return nextWalking();
				case COMBAT:
					return nextCombat();
			}
		}
	}
}]);