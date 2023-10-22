const socketIO = require('socket.io');

const configureSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        // You can add specific listeners here.
        // For instance: addChatListeners(io, socket);
    });

    return io;
};

module.exports = configureSocket;
