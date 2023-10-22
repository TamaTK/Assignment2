const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('joinChannel', ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.join(roomName);
        io.to(roomName).emit('userJoined', username); // Notify others in the channel

        // TODO: Fetch the last 5 messages from the channel and send to the user
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