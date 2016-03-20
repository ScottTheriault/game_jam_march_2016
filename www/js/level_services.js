angular.module('game_jam.level_services', ['common.services'])

.factory('level_services', ['utility', 'text_services', 'walking_services', function(utility, text_services, walking_services) {
	var TEXT_VIEW = 'TEXT_VIEW';
	var WALKING = 'WALKING';
	var levels =
		[
			{type: TEXT_VIEW, text_index: 0},
			{type: WALKING, walking_index: 0},
			{type: WALKING, walking_index: 1}
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
			}
		}
	}
}]);