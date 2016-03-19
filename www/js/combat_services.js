angular.module('game_jam.combat_services', ['common.services'])

.factory('combat_services', ['utility', 'player_services', function(utility, player_services) {
	var PLAYER = 'PLAYER';
	var ENEMY = 'ENEMY';
	var TURNS_SHOWN = 10;
	var combat = {};

	function addTurn() {
		var turns = combat.turns;
		var turn = {};

		if (turns.length) {
			turn.type = PLAYER;
			turn.player = player_services.getPlayers()[0];
			console.log(turn);
		} else {
			var nextPlayer = undefined;
			if (player.type === PLAYER) {
				var id = player.id;
				nextPlayer = player_services.getEnemies()[id];
				turn.type = ENEMY;
				if (typeof nextPlayer === 'undefined') {
					turn.type = PLAYER;
					nextPlayer = player_services.getPlayers()[id+1];
				}
			} else {
				var id = player.id + 1;
				nextPlayer = player_services.getPlayers()[0];
				turn.type = PLAYER;
				if (typeof nextPlayer === 'undefined') {
					nextPlayer = player_services.getEnemies()[id];
					turn.type = ENEMY;
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

	return {
		newCombat: function(backgroundImg) {
			combat =
				{
					backgroundImage: backgroundImg
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
		}
	}
}]);