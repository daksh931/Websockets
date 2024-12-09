const {WebSocketServer} = require("ws");

const wss = new WebSocketServer({port:8050})

const allSockets = [];

wss.on("connection", (socket) => {
    // socket.send("connected")
    socket.on("message", (msg)=>{
        // socket.send(msg);
        try {
            const parsedMessage = JSON.parse(msg);
            if(parsedMessage.type == "join"){
               
                if (parsedMessage.payload && parsedMessage.payload.roomId) {
                    allSockets.push({
                        socket,
                        room: parsedMessage.payload.roomId, // Access roomId safely
                    })
                }
                console.log(allSockets);
            }

            if(parsedMessage.type == "chat"){
                const currRoom = allSockets.find((x)=> x.socket == socket).room
                allSockets.find( (x)=> { if (x.room == currRoom) x.socket.send(parsedMessage.payload.message) } )
            }

        } catch (error) {
            socket.send("invalid")
        }

      
    })
})