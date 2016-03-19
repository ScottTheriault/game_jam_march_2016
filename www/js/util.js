angular.module('game_jam.util', ['common.services'])

.factory('util', ['utility', function(utility) {

	var photoSrc = null;

	var callback = function(buttonIndex) {
		setTimeout(function() {
			// like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
			type = "";
			if (buttonIndex === 1) {
				type = navigator.camera.PictureSourceType.PHOTOLIBRARY;
			} else if (buttonIndex === 2){
				type = navigator.camera.PictureSourceType.CAMERA;
			}
			getPhoto(type);
		});
	};

	function getPhoto(type) {

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URL,
			sourceType: type
		});

		function onSuccess(imageData) {
			src = imageData;

			photoSrc = src;
		}

		function onFail(message) {
			console.log('Failed because: ' + message);
		}
	}

	function buildDate(string) {
		if (typeof string === 'string') {
			var dateTime = string.split(' ');
			var dateSplit = dateTime[0].split('-');
			var timeSplit = dateTime[1].split(':');
			date = new Date();

			date.setYear(dateSplit[0]);
			date.setMonth(dateSplit[1] - 1);
			date.setDate(dateSplit[2]);

			date.setHours(timeSplit[0]);
			date.setMinutes(timeSplit[1]);
			return date;
		} else {
			//assumes it's already been formated may need other checks
			return string;
		}
	}

	function thisFormateTime(time) {
		var date = time;
		if (typeof time === 'undefined') {
			date = new Date();
		} else if (typeof time === 'string') {
			date = buildDate(time);
		}

		return ((date.getHours() + 11) % 12 + 1) + ":" + ('0' + date.getMinutes()).slice(-2) + (date.getHours() >= 12 ? " PM" : " AM");
	}

	function thisFormateDate(string) {
		var monthNames = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];

		var date = string;
		if (typeof string === 'undefined') {
			date = new Date();
		} else if (typeof string === 'string') {
			date = buildDate(string);
		}

		var todaysDate = new Date();
		var tomorrowDate = new Date();
		tomorrowDate.setDate(tomorrowDate.getDate() + 1);
		var yesterdayDate = new Date();
		yesterdayDate.setDate(yesterdayDate.getDate() - 1);

		if(date.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
			return 'Today';
		} else if(date.setHours(0,0,0,0) == tomorrowDate.setHours(0,0,0,0)) {
			return 'Tomorrow';
		} else if(date.setHours(0,0,0,0) == yesterdayDate.setHours(0,0,0,0)) {
			return 'Yesterday';
		} else {
			return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
		}
	}

	return {
		setPhoto: function() {
			var options = {
				'buttonLabels': ['Photo Gallery', 'Camera'],
				'androidEnableCancelButton' : true,
				'winphoneEnableCancelButton' : true,
				'position': [20, 40] // for iPad pass in the [x, y] position of the popover
			};

			window.plugins.actionsheet.show(options, callback);
		},
		getPhoto: function() {
			var ret = photoSrc;
			console.log(photoSrc);
			photoSrc = null;
			return ret;
		},
		getTimeDifference: function(time, old_time) {
			if (typeof time === 'string'){
				time = buildDate(time);
			}
			var quantity = Math.round((old_time - time) / (1000 * 60));
			var unit = 'm ago';

			if (quantity > 60) {
				quantity =  Math.round(quantity/60);
				unit = 'h ago';
				if (quantity > 24) {
					quantity =  Math.round(quantity/24);
					unit = ' d ago';
				}
			}
			return quantity + unit;
		},
		formatDate: function(string) {
			return thisFormateDate(string);
		},
		formatTime: function(time) {
			return thisFormateTime(time);
		},
		formatSimpleDateTime: function(time) {
			var date = time;
			if (typeof time === 'undefined') {
				date = new Date();
			} else if (typeof time === 'string') {
				date = buildDate(time);
			}

			var today = new Date();

			if(date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
				return thisFormateTime(time);
			} else {
				return thisFormateDate(time);
			}
		},
		twoFingerSort: function(messagesBids) {
			var offerIndex = 0;
			var conversation = [];
			for (var messageIndex in messagesBids['messages']) {
				while (messagesBids.offers.length > offerIndex && parseInt(messagesBids.offers[offerIndex].order) < parseInt(messagesBids.messages[messageIndex].order)) {
					messagesBids.offers[offerIndex].time_created = buildDate(messagesBids.offers[offerIndex].time_created);
					messagesBids.offers[offerIndex].offerType = messagesBids.offers[offerIndex].type;
					messagesBids.offers[offerIndex].type = 'offer';
					messagesBids.offers[offerIndex].lastOffer = false;
					conversation.push(messagesBids.offers[offerIndex]);
					offerIndex++;
				}
				messagesBids.messages[messageIndex].time_created = buildDate(messagesBids.messages[messageIndex].time_created);
				messagesBids.messages[messageIndex].type = 'message';
				conversation.push(messagesBids.messages[messageIndex]);
			}
			while (messagesBids.offers.length > offerIndex) {
				messagesBids.offers[offerIndex].offerType = messagesBids.offers[offerIndex].type;
				messagesBids.offers[offerIndex].type = 'offer';
				messagesBids.offers[offerIndex].lastOffer = false;
				conversation.push(messagesBids.offers[offerIndex]);
				offerIndex++;
			}

			if (messagesBids.offers.length) {
				messagesBids.offers[messagesBids.offers.length -1].lastOffer = true;
			}
			return conversation;
		},
		isBlank: function($input) {
			if (typeof $input === "undefined" || $input === null || $input === '') {
				return true;
			}
			if (typeof $input === "string" || typeof $input === "object") {
				var trimed = $input;
				if (typeof $input === "string") {
					trimed = $input.trim();
				}
				return jQuery.isEmptyObject(trimed);
			}
			return false;
		},
		endsWith: function(str, suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		},
		setLastInput: function(conversations) {
			for (var i = 0; i < conversations.length; i++) {
				var offer = conversations[i].offers[0];
				var message = conversations[i].messages[0];
				if (jQuery.isEmptyObject(offer)) {
					conversations[i].lastInput = message;
				} else if (jQuery.isEmptyObject(message)) {
					conversations[i].lastInput = offer;
				} else if (parseFloat(offer.order) > parseFloat(message.order)) {
					conversations[i].lastInput = offer;
				} else {
					conversations[i].lastInput = message;
				}

				if (!jQuery.isEmptyObject(offer)) {
					conversations[i].lastOffer = offer;
				} else {
					conversations[i].lastOffer = {};
				}
			}
		},
		hardCopy: function(input) {
			return JSON.parse(JSON.stringify(input));
		}
	}
}]);