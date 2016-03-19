angular.module('game_jam.player_services', ['common.services', 'game_jam.item_services'])

.factory('player_services', ['utility', 'item_services', function(utility, item_services) {
	var players = [];

	var enemies = [];

	return {
		setNewPlayer: function() {
			player = {items: []};
			switch (players.length) {
				case (0):
					player.name="Scott";
					player.level=1;
					player.items = [item_services.getById(0)];
					break;
				case (1):
					player.name="Kaylin";
					player.level=2;
					player.items = [item_services.getById(1)];
					break;
				case (2):
					player.name="Nathan";
					player.level=3;
					player.items = [item_services.getById(2)];
					break;
			}
			players.push(player);
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
		getPlayers: function() {
			return players;
		}
	}
}]);