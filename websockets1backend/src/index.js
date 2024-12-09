// import {webSocketServer} from 'ws';
const { WebSocketServer } = require('ws');


const wss = new WebSocketServer({port:8050});

wss.on("connection", function (ws){
    
    ws.on("error", console.error),

    ws.on("message", (e) => {
        if(e.toString() === "ping" ){
            ws.send("pong");
        }
    })
    ws.send("connected successfully")
    console.log("connected successfully")

})