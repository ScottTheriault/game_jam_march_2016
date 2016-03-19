angular.module('game_jam.animation_services', ['common.services'])

.factory('animation_services', ['utility', function(utility) {
	return {
		attack: function(attacker, attackee) {
			attacker.animate({
				left: 1000,
			}, {
				duration: 1000,
				step: function( now, fx ){
					$( ".block:gt(0)" ).css( "left", now );
				}
			});
		}
	}
}]);