angular.module('game_jam.combat_services', ['common.services'])

.factory('combat_services', ['utility', 'player_services', function(utility, player_services) {
	var PLAYER = 'PLAYER';
	var ENEMY = 'ENEMY';
	var TURNS_SHOWN = 10;

	var TOGGLE_ATTACK = "ATTACK";
	var TOGGLE_SPELL = "SPELL";
	var TOGGLE_SPECIAL = "SPECIAL";

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

	function attack(attackee) {
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
			switch (combat.toggledMove) {
				case TOGGLE_ATTACK:
					attackerDom.animate({
						left: 1000,
					}, {
						duration: 1000,
						step: function( now, fx ){
							$( ".block:gt(0)" ).css( "left", now );
						}
					});
					break;
				case TOGGLE_SPELL:
					break;
				case TOGGLE_SPECIAL:
					break;
				default:
					return;
			}
		}
	}

	return {
		attackToggle: function() {
			return TOGGLE_ATTACK;
		},
		spellToggle: function() {
			return TOGGLE_SPELL;
		},
		specialToggle: function() {
			return TOGGLE_SPECIAL;
		},
		newCombat: function(backgroundImg) {
			combat =
				{
					backgroundImage: backgroundImg,
					toggledMove: ''
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
			attack(player);
		}
	}
}]);