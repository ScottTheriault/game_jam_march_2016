angular.module('game_jam.combat_services', ['common.services'])

.factory('combat_services', ['utility', 'player_services', 'animation_services', '$timeout', function(utility, player_services, animation_services, $timeout) {
	var PLAYER = 'PLAYER';
	var ENEMY = 'ENEMY';
	var TURNS_SHOWN = 10;

	var TOGGLE_ATTACK = "ATTACK";
	var TOGGLE_FIRE = "FIRE";
	var TOGGLE_LIGHTNING = "LIGHTNING";

	var COMBAT_WIN_STRING = "Victory!";
	var COMBAT_LOSE_STRING = "You dead foo :-(";

	var combat = {};

	function addTurn() {
		var turns = combat.turns;
		var turn = {};

		if (!turns.length) {
			turn.type = PLAYER;
			turn.player = player_services.getPlayers()[0];
		} else {
			var nextPlayer = undefined;
			var lastTurn = turns[turns.length - 1];
			player = lastTurn.player;
			if (lastTurn.type === PLAYER) {
				var index = player.index;
				nextPlayer = player_services.getEnemies()[index];
				turn.type = ENEMY;
				if (typeof nextPlayer === 'undefined') {
					turn.type = PLAYER;
					nextPlayer = player_services.getPlayers()[index+1];
				}
			} else {
				var index = player.index + 1;
				nextPlayer = player_services.getPlayers()[index];
				turn.type = PLAYER;
				if (typeof nextPlayer === 'undefined') {
					nextPlayer = player_services.getEnemies()[index];
					turn.type = ENEMY;
					if (typeof nextPlayer === 'undefined') {
						turn.type = PLAYER;
						nextPlayer = player_services.getPlayers()[index+1];
					}
				}
			}

			if (typeof nextPlayer === 'undefined') {
				nextPlayer = player_services.getPlayers()[0];
				turn.type = PLAYER;
			}
			turn.player = nextPlayer;
		}

		turn.players = [turn.player];
		turns.push(turn);
	}

	function attack(attackee, aoe_end) {
		if (attackee.currentHealth <= 0) {
			if ((typeof aoe_end === 'undefined' || aoe_end)) {
				$timeout(function() {
					nextTurn();
					if (combat.turns[0].type === ENEMY) {
						enemyPlay();
					}
				}, 4500);
			}
			return;
		}

		var turn = combat.turns[0];
		var attacker = turn.player;

		var attackeeType = attackee.isPlayer ? PLAYER : ENEMY;

		if (attackeeType === PLAYER) {
			var attackeeDom = $('#player' + attackee.index);
			var attackerDom = $('#enemy' + attacker.index);
		} else {
			var attackeeDom = $('#enemy' + attackee.index);
			var attackerDom = $('#player' + attacker.index);
		}

		if (turn.type !== attackeeType) {
			var damage = 0;
			switch (combat.toggledMove) {
				case TOGGLE_ATTACK:
					damage = player_services.getBaseDamage(attacker);
					var projectile = player_services.getProjectile(attacker);
					if (projectile === null) {
						animation_services.attack(attackerDom, attackeeDom, damage, attackeeType === PLAYER);
					} else {
						animation_services.attack_ranged(attackee.index, attackerDom, attackeeDom, projectile, damage, false, attackeeType === PLAYER);
					}
					break;
				case TOGGLE_FIRE:
					damage = player_services.getBaseSpellDamage(attacker);
					animation_services.attack_ranged(attackee.index, attackerDom, attackeeDom, 'img/projectile/fire_ball.png', damage, true, attackeeType === PLAYER);
					break;
				case TOGGLE_LIGHTNING:
					damage = parseInt(player_services.getBaseSpellDamage(attacker)/3);
					animation_services.attack_ranged(attackee.index, attackeeDom, attackeeDom, 'img/projectile/lightning_bolt.png', damage, true, attackeeType === PLAYER);
					break;
				default:
					return;
			}

			$timeout(function() {
				attackee.currentHealth -= damage;
				if (attackee.currentHealth <= 0) {
					animation_services.die(attackeeDom);
				}
			}, 2500);

			$timeout(function() {
				var players = player_services.getEnemies();
				var playerAlive = false;
				for (var i = 0; i < players.length; i++) {
					if (players[i].currentHealth > 0) {
						playerAlive = true;
					}
				}
				if (!playerAlive) {
					combat.overString = COMBAT_WIN_STRING;
				}

				var players = player_services.getPlayers();
				var playerAlive = false;
				for (var i = 0; i < players.length; i++) {
					if (players[i].currentHealth > 0) {
						playerAlive = true;
					}
				}
				if (!playerAlive) {
					combat.overString = COMBAT_LOSE_STRING;
				}

				if (!combat.overString && (typeof aoe_end === 'undefined' || aoe_end)) {
					nextTurn();
					if (combat.turns[0].type === ENEMY) {
						enemyPlay();
					}
				} else {
					combat.toggledMove = '';
				}
			}, 3500);
		}
	}

	function nextTurn() {
		combat.toggledMove = '';
		combat.turns.shift();
		addTurn();

		if (combat.turns[0].player.currentHealth <= 0) {
			nextTurn();
		}
	}
	function enemyPlay() {
		var players = player_services.getPlayers();
		var index = Math.floor(Math.random() * players.length);
		if (players[index].currentHealth <= 0) {
			enemyPlay();
		} else {
			combat.toggledMove = TOGGLE_ATTACK;
			attack(players[index]);
		}
	}

	return {
		attackToggle: function() {
			return TOGGLE_ATTACK;
		},
		fireToggle: function() {
			return TOGGLE_FIRE;
		},
		lightningToggle: function() {
			return TOGGLE_LIGHTNING;
		},
		newCombat: function(backgroundImg) {
			combat =
				{
					backgroundImage: backgroundImg,
					toggledMove: '',
					overString: ''
				};
			combat.turns = [];
			while (combat.turns.length < TURNS_SHOWN) {
				addTurn();
			}
		},
		getBackgroundImg: function() {
			return combat.backgroundImage;
		},
		getTurns: function() {
			return combat.turns;
		},
		moveToggle: function(move) {
			if (combat.turns[0].type === PLAYER) {
				combat.toggledMove = move;
			}
		},
		getToggledMove: function() {
			return combat.toggledMove;
		},
		attackTarget: function(player) {
			if (combat.toggledMove === TOGGLE_LIGHTNING) {
				var enemies = player_services.getEnemies();
				for (var i = 0; i < enemies.length; i++) {
					attack(enemies[i], i === enemies.length - 1);
				}
			} else {
				attack(player);
			}
		},
		getCombatOverString: function() {
			return combat.overString;
		}, iWin: function() {
			return combat.overString === COMBAT_WIN_STRING;
		}
	}
}]);