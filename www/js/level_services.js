angular.module('game_jam.level_services', ['common.services'])

.factory('level_services', ['utility', 'text_services', function(utility, text_services) {
	var TEXT_VIEW = 'TEXT_VIEW';
	var levels =
		[
			{type: TEXT_VIEW, text_index: 0}
		];
	var index = -1;

	function nextTextView() {
		text_services.setByIndex(levels[index].text_index);
		return 'tab.text_view';
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
			}
		}
	}
}]);