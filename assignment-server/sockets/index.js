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

        // Example: Listener for joining a group
        socket.on('joinGroup', (data) => {
            // Logic to handle joining a group
            // Adapt this to fit Repo 1's data structure and logic
            // ...
            socket.join(data.groupId); // Join a specific room based on the group ID
            io.to(data.groupId).emit('userJoined', data.username); // Notify others in the group
        });

        // Example: Listener for sending a message
        socket.on('sendMessage', (data) => {
            // Logic to handle sending a message
            // Adapt this to fit Repo 1's data structure and logic
            // ...
            io.to(data.groupId).emit('newMessage', data.message); // Broadcast the message to the group
        });

        // ... Add other listeners based on Repo 2's `listeners.js`

        // Placeholder for disconnect event
        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Handle user disconnection if needed
        });
    });

    return io;
};

module.exports = configureSocket;
