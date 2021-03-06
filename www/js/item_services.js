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
					attack: 0, defense: 0, spell_bonus: 0,
					items: []
				},
				{
					id: 4, slot: 'hat', name: 'basic warrior hat', img: 'img/hats/basic_hat_warrior.png', style: 'width: 25px; position: absolute; top: -1px; left: 7px',
					attack: 0, defense: 2, spell_bonus: 0,
					items: []
				},
				{
					id: 5, slot: 'body', name: 'basic warrior body', img: 'img/body/basic_warrior.png', style: 'width: 25px; position: absolute; top: 26px; left: 7px',
					attack: 1, defense: 5, spell_bonus: -2,
					items: [
						{slot: 'arm', item: null},
					]
				},
				{
					id: 6, slot: 'arm', name: 'basic warrior arm', img: 'img/arms/basic_warrior_arm.png', style: 'width: 25px; position: absolute; top: 26px; left: 17px',
					attack: 1, defense: 1, spell_bonus: -1,
					items: [
						{slot: 'weapon', item: null},
					]
				},
				{
					id: 7, slot: 'weapon', name: 'basic warrior sword', img: 'img/weapons/basic_warrior_sword.png', style: 'width: 14px; position: absolute; top: -1px; left: 31px',
					attack: 5, defense: 3, spell_bonus: 1,
					items: []
				},
				{
					id: 8, slot: 'body', name: 'basic ranger body', img: 'img/body/basic_ranger.png', style: 'width: 25px; position: absolute; top: 26px; left: 7px',
					attack: 3, defense: 3, spell_bonus: 0,
					items: [
						{slot: 'arm', item: null},
					]
				},
				{
					id: 9, slot: 'arm', name: 'basic ranger arm', img: 'img/arms/basic_ranger_arm.png', style: 'width: 25px; position: absolute; top: 26px; left: 17px',
					attack: 2, defense: 0, spell_bonus: 0,
					items: [
						{slot: 'weapon', item: null},
					]
				},
				{
					id: 10, slot: 'weapon', ranged: true, projectile_img: 'img/projectile/arrow.png', name: 'basic warrior sword', img: 'img/weapons/basic_ranger_bow.png', style: 'width: 10px; position: absolute; top: 12px; left: 30px',
					attack: 9, defense: 1, spell_bonus: -1,
					items: []
				},
				{
					id: 11, slot: 'hat', name: 'basic warrior hat', img: 'img/hats/basic_hat_ranger.png', style: 'width: 25px; position: absolute; top: 4px; left: 5px',
					attack: 2, defense: 1, spell_bonus: 0,
					items: []
				},
				{
					id: 12, slot: 'body', name: 'basic mage body', img: 'img/body/basic_mage.png', style: 'width: 25px; position: absolute; top: 24px; left: 5px',
					attack: -2, defense: 1, spell_bonus: 3,
					items: [
						{slot: 'arm', item: null},
					]
				},
				{
					id: 13, slot: 'arm', name: 'basic mage arm', img: 'img/arms/basic_mage_arm.png', style: 'width: 25px; position: absolute; top: 26px; left: 17px',
					attack: 0, defense: 0, spell_bonus: 2,
					items: [
						{slot: 'weapon', item: null},
					]
				},
				{
					id: 14, slot: 'weapon', ranged: true, projectile_img: 'img/projectile/staff_shot.png', name: 'basic warrior sword', img: 'img/weapons/basic_mage_staff.png', style: 'width: 10px; position: absolute; top: 10px; left: 35px',
					attack: 0, defense: 1, spell_bonus: 9,
					items: []
				},
				{
					id: 15, slot: 'hat', name: 'basic mage hat', img: 'img/hats/basic_hat_mage.png', style: 'width: 35px; position: absolute; top: -5px; left: 1px',
					attack: 0, defense: 1, spell_bonus: 2,
					items: []
				},
				{
					id: 16, slot: 'head', name: 'orc warrior', img: 'img/enemy/heads/basic_enemy_orc_warrior.png', style: 'height: 70px;',
					attack: 1, defense: 16, spell_bonus: 0,
					items: []
				},
				{
					id: 17, slot: 'head', name: 'orc ranger', ranged: true, projectile_img: 'img/projectile/arrow.png', img: 'img/enemy/heads/basic_enemy_orc_ranger.png', style: 'height: 70px;',
					attack: 7, defense: 7, spell_bonus: 0,
					items: []
				},
				{
					id: 18, slot: 'head', name: 'orc mage', ranged: true, projectile_img: 'img/projectile/staff_shot.png', img: 'img/enemy/heads/basic_enemy_orc_mage.png', style: 'height: 70px;',
					attack: 9, defense: 3, spell_bonus: 0,
					items: []
				}
			];

	function addItem(holder_item, item_id) {
		new_item = JSON.parse(JSON.stringify(items[item_id]));
		for (var i = 0; i < holder_item.items.length; i++) {
			if (holder_item.items[i].slot === new_item.slot) {
				holder_item.items[i].item = new_item;
				return;
			} else if(holder_item.items[i].item !== null) {
				addItem(holder_item.items[i].item, item_id);
			}
		}
	}
	return {
		getById: function(id) {
			return JSON.parse(JSON.stringify(items[id]));
		}, addItem: function(holder_item, item_id) {
			addItem(holder_item, item_id);
		}
	}
}]);