/* Magic Mirror
 * Node Helper: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");
var WebSocket = require("ws");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "INIT_OB") {
			console.log("MMM ObjectBlocks Notification:", 
notification, "payload: ", payload);
			//let websocket_URL = payload;
			let websockets = payload;

			for(var i = 0; i < websockets.length; i++) {
				let websocket = websockets[i]; // { name: xxxx, websocket_URL: xxx }

				let ws = new WebSocket(websocket.websocket_URL);

				// onopen: called when connected
				ws.onopen = function() {
					console.log("Websocket connected");
				};

				let self = this;

				// onmessage:  called when message arrives
				ws.onmessage = function(event) {
					let message = event.data; // actual data
					let data = JSON.parse(message); // convert string to JSON
					// console.log("data: " + data.value);
					//console.log("url: " + ws.url + " value: " + data.value);
					self.sendSocketNotification("DATA_RECV", 
						{ url: ws.url, value: data.value });
				};

				// onclose:  called when disconnected
				ws.onclose = function() {
					console.log("Websocket disconnected");
				};
			}
		}
	},

});
