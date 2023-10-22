const socketIO = require('socket.io');
const addListeners = require('./listeners');

const configureSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        addListeners(io, socket); // Add the listeners from listeners.js

        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Handle user disconnection if needed
        });
    });

    return io;
};

module.exports = configureSocket;