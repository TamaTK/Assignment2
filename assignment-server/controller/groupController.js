const Group = require('../models/group');
const Channel = require('../models/channel');
const Message = require('../models/message');

exports.createGroup = async (req, res) => {
    // console.log('Create group endpoint hit');
    try {
        const { name, userId } = req.body;
        // Check if group with the same name already exists
        const existingGroup = await Group.findOne({ name: name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group with this name already exists' });
        }
        // Create a new group
        const newGroup = new Group({
            name: name,
            admins: [userId],
            members: [userId]
        });
        await newGroup.save();
        res.status(201).json({ message: 'Group creation successful', newgroup: { newGroup } }); 

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllGroups = async (req, res) => {
        try {
        const groups = await Group.find({});
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createChannel = async (req, res) => {
    console.log('Backend - /create-channel endpoint hit');
    console.log('Request Body:', req.body);
    const { groupId, channelName } = req.body;
    try {
        const group = await Group.findById(groupId)
        
        // Create the channel in the Channel model
        const newChannel = new Channel({
            name: channelName,
            group: groupId
        });
        await newChannel.save();

        // Push the ObjectId of the newly created channel into the group's channels array
        group.channels.push(newChannel._id);
        await group.save();

        res.status(200).json({ message: 'Channel creation successful', newChannel: { newChannel } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getGroupChannels = async (req, res) => {
    const groupId = req.params.groupId;
    console.log('Fetching channels for groupId:', groupId);

    try {
        const group = await Group.findById(groupId).populate('channels');
        if (!group) {
            return res.status(404).send('Group not found');
        }
        res.status(200).json(group.channels);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getChannelMessages = async (req, res) => {
    const channelId = req.params.channelId;
    try {
        // Fetch the last 5 messages for the specified channel
        const messages = await Message.find({ channel: channelId })
            .sort({ timestamp: -1 })
            .limit(5)
            .populate('sender', 'username'); // Populate the sender's username

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
