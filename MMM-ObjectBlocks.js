/* global Module */

/* Magic Mirror
 * Module: MMM-ObjectBlocks
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-ObjectBlocks", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		websocket_URL: ""
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;
		var data = null;

		//Flag for check if module is loaded
		this.loaded = false;
		this.websocket_URL = this.config.websocket_URL;
		this.sendSocketNotification("INIT_OB", this.websocket_URL);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		var wrapperDataNotification = document.createElement("div");
		// translations  + datanotification
		wrapperDataNotification.innerHTML =  "LIGHT: " + this.data;

		wrapper.appendChild(wrapperDataNotification);
		return wrapper;
	},

	getStyles: function () {
		return [
			"MMM-ObjectBlocks.css",
		];
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
                if(notification === "DATA_RECV") {
			//console.log("payload: " + payload);
			this.data = payload; // store the data
			this.updateDom();
		}
	},
});
