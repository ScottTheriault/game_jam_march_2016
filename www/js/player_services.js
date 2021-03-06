angular.module('game_jam.player_services', ['common.services', 'game_jam.item_services'])

.factory('player_services', ['utility', 'item_services', function(utility, item_services) {
	var DMG_PER_LVL = 2;
	var SLELL_DMG_PER_LVL = 2;
	var HEALTH_PER_LVL = 2;

	var players = [];

	var enemies = [];

	function getItemDamage(item) {
		if (item === null) {
			return 0;
		}
		var subDamage = 0;
		for (var i = 0; i < item.items.length; i++) {
			subDamage += getItemDamage(item.items[i].item);
		}
		return item.attack + subDamage;
	}

	function getItemSpellDamage(item) {
		if (item === null) {
			return 0;
		}
		var subDamage = 0;
		for (var i = 0; i < item.items.length; i++) {
			subDamage += getItemSpellDamage(item.items[i].item);
		}
		return item.spell_bonus + subDamage;
	}

	function getItemHealth(item) {
		if (item === null) {
			return 0;
		}
		var subDamage = 0;
		for (var i = 0; i < item.items.length; i++) {
			subDamage += getItemHealth(item.items[i].item);
		}
		return item.defense + subDamage;
	}

	function setPlayerCurrentHealth(player) {
		var health = player.level * HEALTH_PER_LVL;
		health += getItemHealth(player.head);
		player.maxHealth = health;
		player.currentHealth = health;
	}

	function getProjectile(item) {
		if (item === null) {
			return null;
		}
		if (item.ranged) {
			return item.projectile_img;
		}

		for (var i = 0; i < item.items.length; i++) {
			var projectile = getProjectile(item.items[i].item);
			if (projectile !== null) {
				return projectile;
			}
		}
		return null;
	}

	return {
		setKnight: function() {
			player =
				{
					isPlayer: true,
					id: 0,
					index: 0,
					name: "Scott",
					level: 5,
					head: item_services.getById(0)
				};
			item_services.addItem(player.head, 4);
			item_services.addItem(player.head, 5);
			item_services.addItem(player.head, 6);
			item_services.addItem(player.head, 7);
			setPlayerCurrentHealth(player);
			players.push(player);
		},
		setRanger: function() {
			player =
				{
					isPlayer: true,
					id: 1,
					index: 1,
					name: "Kaylin",
					level: 5,
					head: item_services.getById(1)
				};
			item_services.addItem(player.head, 8);
			item_services.addItem(player.head, 9);
			item_services.addItem(player.head, 10);
			item_services.addItem(player.head, 11);
			setPlayerCurrentHealth(player);
			players.push(player);
		},
		setMage: function() {
			player =
				{
					isPlayer: true,
					id: 2,
					index: 2,
					name: "Nathan",
					level: 5,
					head: item_services.getById(2)
				};
			setPlayerCurrentHealth(player);
			item_services.addItem(player.head, 12);
			item_services.addItem(player.head, 13);
			item_services.addItem(player.head, 14);
			item_services.addItem(player.head, 15);
			players.push(player);
		},
		setNewPlayer: function() {
			player = {isPlayer: true};
			switch (players.length) {
				case (0):
					player.id = 0;
					player.index = 0;
					player.name="Scott";
					player.level=1;
					player.head = item_services.getById(0);
					break;
				case (1):
					player.id = 1;
					player.index = 1;
					player.name="Kaylin";
					player.level=2;
					player.head = item_services.getById(1);
					break;
				case (2):
					player.id = 2;
					player.index = 2;
					player.name="Nathan";
					player.level=3;
					player.head = item_services.getById(2);
					break;
			}
			setPlayerCurrentHealth(player);
			players.push(player);
		},
		clearPlayers: function() {
			players = []
		},
		clearEnemies: function() {
			enemies = [];
		},
		addPlayer: function(player) {
			player.index = players.length
			players.push(player);
		},
		addEnemyPlayer: function(enemy) {
			enemy.index = enemies.length;
			setPlayerCurrentHealth(enemy);
			enemies.push(enemy);
		},
		getPlayers: function() {
			return players;
		},
		getEnemies: function() {
			return enemies;
		},
		getBaseDamage: function(player) {
			var damage = player.level * DMG_PER_LVL;
			damage += getItemDamage(player.head);
			return damage;
		},
		getBaseSpellDamage: function(player) {
			var damage = player.level * SLELL_DMG_PER_LVL;
			damage += getItemSpellDamage(player.head);
			return damage;
		},
		getProjectile: function(player) {
			return getProjectile(player.head);
		}
	}
}]);