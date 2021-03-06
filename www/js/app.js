// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('game_jam', ['ionic','ionic.service.core', 'game_jam.controllers', 'game_jam.util', 'game_jam.player_services', 'game_jam.enemy_services', 'game_jam.item_services', 'game_jam.combat_services', 'game_jam.animation_services', 'game_jam.text_services', 'game_jam.level_services', 'game_jam.walking_services'])

.run(function($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: 'templates/tabs.html',
		controller: 'AppCtrl'
	})

	.state('tab.main_menu', {
		url: '/main_menu',
		views: {
			'tab-main-menu': {
				templateUrl: 'templates/views/main_menu.html',
				controller: 'MainMenuCtrl'
			}
		}
	})

	.state('tab.text_view', {
		url: '/text_view',
		views: {
			'tab-text-view': {
				templateUrl: 'templates/views/text_view.html',
				controller: 'TextViewCtrl'
			}
		}
	})

	.state('tab.walk', {
		url: '/walk',
		views: {
			'tab-walk': {
				templateUrl: 'templates/views/walk.html',
				controller: 'WalkCtrl'
			}
		}
	})

	.state('tab.combat', {
		url: '/combat',
		views: {
			'tab-combat': {
				templateUrl: 'templates/views/combat.html',
				controller: 'CombatCtrl'
			}
		}
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/main_menu');

});
