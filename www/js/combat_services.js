angular.module('game_jam.combat_services', ['common.services'])

.factory('combat_services', ['utility', function(utility) {
	var combat = {};

	return {
		newCombat: function(backgroundImg) {
			combat =
				{
					backgroundImage: backgroundImg
				};
		}
	}
}]);