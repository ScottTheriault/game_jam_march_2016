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

	function popDamage(dom, damage) {
		var dmgDom = dom.find('.damage');
		dmgDom.css("display", "inline-block");
		dmgDom.text(damage);
		console.log(dmgDom);
		$timeout(function() {
			dmgDom.hide();
		}, 2000);
	}

	return {
		attack: function(attacker, attackee, damage, invert) {
			var attackerPosition = attacker.position();
			var attackeePosition = attackee.position();

			var left = attackeePosition.left + (attackerPosition.left > attackeePosition.left ? 50 : -50);

			move(attacker, attackeePosition.top, left, 1000, invert);

			$timeout(function() {
				popDamage(attackee, damage);
				shake(attackee, !invert);
			}, 1000);

			$timeout(function() {
				move(attacker, attackerPosition.top, attackerPosition.left, 1000, invert);
			}, 2000);
		}
	}
}]);