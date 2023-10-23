const Message = require('../models/message');
const User = require('../models/user');

// Function to add socket.io event listeners
const addListeners = (io, socket) => {
    console.log('New connection');

    // Event handler for when a user joins a channel
    socket.on('joinChannel', async ({ groupId, channelId, userId }) => {
        const roomName = `${groupId}-${channelId}`;
        try {
            const user = await User.findById(userId);
            if (user) {
                // Notify others in the channel using the username
                io.to(roomName).emit('userJoined', user.username);

                // Create a join message and save it to the database
                const joinMessage = new Message({
                    content: `${user.username} joined the channel.`,
                    sender: userId,
                    channel: channelId,
                    type: 'join'
                });
                await joinMessage.save();

                // Fetch the last 5 messages for the channel
                const messages = await Message.find({ channel: channelId })
                    .sort({ timestamp: -1 })
                    .limit(5)
                    .populate('sender', 'username'); // Populate the sender's username

                // Send the messages to the user who joined the channel
                socket.emit('pastMessages', messages);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        socket.join(roomName); // Join the user to the channel room
    });

    // Event handler for when a user sends a message
    socket.on('sendMessage', async (messageContent, { groupId, channelId, userId }) => {
        if (!channelId || typeof channelId !== 'string' || channelId.length !== 24) {
            console.error('Invalid channelId:', channelId);
            return;
        }
        if (!userId || typeof userId !== 'string' || userId.length !== 24) {
            console.error('Invalid userId:', userId);
            return;
        }

        const roomName = `${groupId}-${channelId}`;

        // Broadcast the new message to all users in the channel
        io.to(roomName).emit('newMessage', messageContent);

        // Create a new message and save it to the database
        const newMessage = new Message({
            content: messageContent,
            sender: userId,
            channel: channelId
        });
        try {
            await newMessage.save();
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Event handler for when a user leaves a channel
    socket.on('leaveChannel', async ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.leave(roomName); // Leave the channel room
        // Notify others in the channel that the user has left
        io.to(roomName).emit('userLeft', username);

        try {
            const user = await User.findOne({ username: username });
            if (user) {
                // Create a leave message and save it to the database
                const leaveMessage = new Message({
                    content: `${username} left the channel.`,
                    sender: user._id,
                    channel: channelId,
                    type: 'leave'
                });
                await leaveMessage.save();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

module.exports = addListeners;

