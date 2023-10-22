const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('join', ({ groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        console.log(`User has joined: ${roomName}`);
        socket.join(roomName);
    });

    socket.on('sendImage', (base64Image, { groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        io.to(roomName).emit('recieveImage', base64Image);
    });

    socket.on('sendMessage', (message, { groupId, channelId }) => {
        const roomName = `${groupId}-${channelId}`;
        io.to(roomName).emit('newMessage', message);
    });

    socket.on('leave', ({ groupId, channelId }) => {
    const roomName = `${groupId}-${channelId}`;
    console.log(`User left: ${roomName}`);
    socket.leave(roomName);
});
}

module.exports = addListeners;