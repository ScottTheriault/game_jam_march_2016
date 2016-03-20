angular.module('game_jam.text_services', ['common.services'])

.factory('text_services', ['utility', function(utility) {
	var textStreams =
					[
						[
						"Welcome Sir. Edward, the mythical dragon Qenoff is attacking! Take your brother Alphonse and the trusted LaFawnduh",
						"Only with the power of teamwork will you manage to defeat Qenoff"
						]
					]
	var textStream = [];
	var index = 0;
	return {
		setByIndex: function(i) {
			textStream = textStreams[i];
			index = 0;
		},
		getText: function() {
			return textStream[index];
		},
		next: function() {
			index++;
			if (index === textStream.length) {
				index = 0;
			}
			return index;
		}
	}
}]);