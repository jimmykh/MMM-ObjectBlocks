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
		//websocket_URL: ""
		websockets: []
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;
		var data = null;

		this.values = {}; // store name value pairs
		//Flag for check if module is loaded
		this.loaded = false;
		//this.websocket_URL = this.config.websocket_URL;
		this.websockets = this.config.websockets;
		this.sendSocketNotification("INIT_OB", this.websockets);
	},


	getDom: function() {
	    Log.log('Updating DOM for GA');
	    var wrapper = document.createElement("div");

	    var header = document.createElement("header");
	    header.innerHTML = "ObjectBlocks";
	    wrapper.appendChild(header); 

	    // create elements
	    var table = document.createElement("table");
	    table.classList.add("small", "table");
	    table.border = '0';

	    var tr = document.createElement("tr");
	    var th1 = document.createElement("th");
 	    th1.innerHTML = "Source";
	    th1.className = "line";
	    var th2 = document.createElement("th");
	    th2.innerHTML = "Value";
	    th2.className = "message";

	    // Construct the structure
	    table.appendChild(tr);
	    tr.appendChild(th1);
 	    tr.appendChild(th2);

	    // Table Data
	    for (var key in this.values) {
 	       var tr1 = document.createElement("tr");
	       var td1 = document.createElement("td");
	       td1.innerHTML = key;
	       td1.className = "line";
	       var td2 = document.createElement("td");
	       td2.innerHTML = this.values[key];
	       td2.className = "message";

	       // Construct the structure
	       table.appendChild(tr1);
 	       tr1.appendChild(td1);
	       tr1.appendChild(td2);
	    }

	    wrapper.appendChild(table);

	    return wrapper;

/*
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		for (var key in this.values) {
		
			var wrapperDataNotification = document.createElement("div");
			// translations  + datanotification
		
			wrapperDataNotification.innerHTML =  key + ": " + this.values[key];
			wrapper.appendChild(wrapperDataNotification);
		}
		return wrapper;
*/
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
			//this.data = payload; // store the data
			// payload:  { url: ws_url, value: data_value }
			
			for(var i = 0; i < this.websockets.length; i++) {
				let websocket = this.websockets[i];

				if(websocket.websocket_URL == payload.url) {
					this.values[websocket.name] = payload.value;
				}
			}

			this.updateDom();
		}
	},
});
