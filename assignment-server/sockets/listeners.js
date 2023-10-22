const Message = require('../models/message');

const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('joinChannel', async ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.join(roomName);
        io.to(roomName).emit('userJoined', username); // Notify others in the channel
    
        try {
            // Fetch the last 5 messages for the channel
            const messages = await Message.find({ channel: channelId })
                .sort({ timestamp: -1 })
                .limit(5)
                .populate('sender', 'username'); // Populate the sender's username
    
            // Send the messages to the user who joined the channel
            socket.emit('pastMessages', messages);
        } catch (error) {
            console.error('Error fetching past messages:', error);
        }
    });

    socket.on('sendMessage', (message, { groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        io.to(roomName).emit('newMessage', message);

        // TODO: Save the message to the database or in-memory storage
    });

    socket.on('leaveChannel', ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.leave(roomName);
        io.to(roomName).emit('userLeft', username); // Notify others in the channel
    });
}

module.exports = addListeners;