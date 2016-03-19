angular.module('game_jam.animation_services', ['common.services'])

.factory('animation_services', ['utility', '$window', '$timeout', function(utility, $window, $timeout) {
	function move(dom, top, left, time, invert) {

		if (invert) {
			left = $window.innerWidth - left - 150;
		}
		dom.animate({
			left: left,
			top: top
		}, {
			duration: time,
			step: function( now, fx ){
				$( ".block:gt(0)" ).css( "left", now );
			}
		});
	}

	function shake(dom, invert) {
		var top = dom.position().top;
		var left = dom.position().left;

		for (var i = 0; i < 5; i++) {
			leftMove = left + (i%2 ? 5 : -5);
			move(dom, top, leftMove, 200, invert);
		}
		move(dom, top, left, 200, invert);

	}

	return {
		attack: function(attacker, attackee, invert) {
			var attackerPosition = attacker.position();
			var attackeePosition = attackee.position();

			var left = attackeePosition.left + (attackerPosition.left > attackeePosition.left ? 50 : -50);

			move(attacker, attackeePosition.top, left, 1000, invert);

			$timeout(function() {
				shake(attackee, !invert);
			}, 1000);

			$timeout(function() {
				move(attacker, attackerPosition.top, attackerPosition.left, 1000, invert);
			}, 2000);
		}
	}
}]);