angular.module('game_jam.player_services', ['common.services'])

.factory('player_services', ['utility', function(utility) {
	var players = [];

	var enemies = [];

	return {
		setNewPlayer: function() {
			player = {items: []};
			switch (player.length) {
				case (0):
					player.name="Scott";
					player.level=1;
					break;
				case (1):
					player.name="Kaylin";
					player.level=2;
					break;
				case (2):
					player.name="Nathan";
					player.level=3;
					break;
			}
		},
		clearPlayers: function() {
			players = []
		},
		clearEnemies: function() {
			enemies = [];
		},
		addPlayer: function(player) {
			players.push(player);
		},
		testIt: function() {
			return 'boobies';
		}
	}
}]);