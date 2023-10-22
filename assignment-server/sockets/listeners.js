const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('join', (group) => {
        console.log(`User has joined: ${group}`);
        socket.join(group);
    });

    socket.on('sendImage', (base64Image, group) => {
        io.to(group).emit('recieveImage', base64Image);
    });

    socket.on('sendMessage', (message, group) => {
        io.to(group).emit('newMessage', message);
    });

    socket.on('leave', (group) => {
        console.log(`User left group: ${group}`);
        socket.leave(group);
    });

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });
};


module.exports = addListeners;