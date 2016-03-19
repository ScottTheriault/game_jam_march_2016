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
				}
			];
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(items[id]))
		}
	}
}]);