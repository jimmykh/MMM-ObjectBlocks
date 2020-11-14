# MMM-ObjectBlocks
This is a module to help communicate between Magic Mirror and Arduino via Web Socket and ObjectBlocks IOT Education Platform (https://www.objectblocks.cc).

With ObjectBlocks IOT Education platform, you can easily create intelligent devices with your choice of micro-processors (Arduino, micro:bit etc), and setup your Magic Mirror to centrally display the information sent from your devices.  

## Installation

```
git clone https://github.com/jimmykh/MMM-ObjectBlocks
cd MMM-ObjectBlocks
npm install
```

## Configuration

Open config.js and add in the followings:

```
{
  module: "MMM-ObjectBlocks",
  position: "top_left",
  config: {
    websockets: [
      { 
        name: "Light",
        websocket_URL: "wss://hub.objectblocks.cc/channel/xxxxxxxxxxxxxx",
      },
      { 
        name: "Temperature",
        websocket_URL: "wss://hub.objectblocks.cc/channel/yyyyyyyyyyyyyy",
      }
   ]
  }
}
```

- websocket_URL can be found under Webhook of corresponding channel
- you can define as many websockets as you want, and each will be displayed in a separate row.

If you have any suggestion and questions, please contact us by objectblocks@coding101.hk 
