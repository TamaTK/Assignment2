const socketIO = require('socket.io');
const addListeners = require('./listeners');

// Function to configure and handle WebSocket connections
const configureSocket = (server) => {
    // Create a Socket.IO server and configure CORS
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:4200", // Allow connections from this origin
            methods: ["GET", "POST"] // Allow specified HTTP methods
        }
    });

    // Handle new WebSocket connections
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        // Add event listeners for this connection (from listeners.js)
        addListeners(io, socket);

        // Handle user disconnection if needed
        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Additional disconnection handling can be added here
        });
    });

    return io; // Return the configured Socket.IO server
};

module.exports = configureSocket;
