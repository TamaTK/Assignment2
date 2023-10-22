const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('join', ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.join(roomName);
        io.to(roomName).emit('userJoined', username); // Notify others in the channel
    });

    socket.on('sendImage', (base64Image, { groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        io.to(roomName).emit('recieveImage', base64Image);
    });

    socket.on('sendMessage', (message, { groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        io.to(roomName).emit('newMessage', message);
    });

    socket.on('leave', ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.leave(roomName);
        io.to(roomName).emit('userLeft', username); // Notify others in the channel
    });
}

module.exports = addListeners;