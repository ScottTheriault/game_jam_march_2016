angular.module('game_jam.item_services', ['common.services'])

.factory('item_services', ['utility', function(utility) {
	var items =
			[
				{
					id: 0, slot: 'head', name: 'player 0 head', img: 'img/heads/player_0.png', style: '',
					attack: 2, defense: 2, spell_bonus: 0,
					items:
						[
							{slot: 'hat', item: null},
							{slot: 'body', item: null}
						]
				},
				{
					id: 1, slot: 'head', name: 'player 1 head', img: 'img/heads/player_1.png', style: '',
					attack: 2, defense: 2, spell_bonus: 0,
					items:
						[
							{slot: 'hat', item: null},
							{slot: 'body', item: null}
						]
				},
				{
					id: 2, slot: 'head', name: 'player 2 head', img: 'img/heads/player_2.png', style: '',
					attack: 2, defense: 2, spell_bonus: 0,
					items:
						[
							{slot: 'hat', item: null},
							{slot: 'body', item: null}
						]
				},
				{
					id: 3, slot: 'head', name: 'evil ball', img: 'img/enemy/heads/evil_ball.png', style: '',
					attack: 1, defense: 1, spell_bonus: 0,
					items: []
				},
				{
					id: 4, slot: 'hat', name: 'basic warrior hat', img: 'img/hats/basic_hat_warrior.png', style: '',
					attack: 1, defense: 1, spell_bonus: 0,
					items: []
				}
			];
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(items[id]));
		}, addItem: function(holder_item, item_id) {
			new_item = JSON.parse(JSON.stringify(items[item_id]));
			for (var i = 0; i < holder_item.items.length; i++) {
				if (holder_item.items[i].slot === new_item.slot) {
					holder_item.items[i].item = new_item;
				}
			}
		}
	}
}]);