const Message = require('../models/message');
const User = require('../models/user');

const addListeners = (io, socket) => {
    console.log('New connection');

    socket.on('joinChannel', async ({ groupId, channelId, userId }) => {
        const roomName = `${groupId}-${channelId}`;
        try {
            const user = await User.findById(userId);
            if (user) {
                io.to(roomName).emit('userJoined', user.username); // Notify others in the channel using the username

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
        socket.join(roomName);
    });

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
        io.to(roomName).emit('newMessage', messageContent);

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

    socket.on('leaveChannel', async ({ groupId, channelId, username }) => {
        const roomName = `${groupId}-${channelId}`;
        socket.leave(roomName);
        io.to(roomName).emit('userLeft', username); // Notify others in the channel

        try {
            const user = await User.findOne({ username: username });
            if (user) {
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
