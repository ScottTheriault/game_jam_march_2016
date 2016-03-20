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

	function rotate(dom, deg) {
		$({deg: 0}).animate({deg: deg}, {
			duration: 500,
			step: function(now) {
				dom.css({
					transform: 'rotate(' + now + 'deg)'
				});
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
		$timeout(function() {
			dmgDom.hide();
		}, 1500);
	}

	return {
		attack: function(attacker, attackee, damage, invert) {
			var attackerPosition = attacker.position();
			var attackeePosition = attackee.position();

			console.log(attackeePosition);
			var left = attackeePosition.left + (attackerPosition.left > attackeePosition.left ? 50 : -50);

			move(attacker, attackeePosition.top, left, 1000, invert);

			$timeout(function() {
				popDamage(attackee, damage);
				shake(attackee, !invert);
			}, 1000);

			$timeout(function() {
				move(attacker, attackerPosition.top, attackerPosition.left, 1000, invert);
			}, 2000);
		},
		attack_ranged: function(attacker, attackee, projectile, damage, invert) {
			var attackerPosition = attacker.position();
			var attackeePosition = attackee.position();

			console.log(attackeePosition);
			var html = '<img src="' + projectile + '" class="projectile" id="tempProjectile"/>';
			attacker.append(html);
			var projDom = $('#tempProjectile');
			console.log(projDom);
			var left = attackeePosition.left + (attackerPosition.left > attackeePosition.left ? 50 : -50) - attackerPosition.left;
			move(projDom, attackeePosition.top - attackerPosition.top, left, 1000, false);

			$timeout(function() {
				popDamage(attackee, damage);
				shake(attackee, !invert);
			}, 1000);

			$timeout(function() {
				projDom.remove();
			}, 2000);
		},
		die: function(attackeeDom) {
			rotate(attackeeDom, 90);
		}
	}
}]);