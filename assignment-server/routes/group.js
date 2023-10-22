var express = require('express');
var router = express.Router();
var Group = require('../models/group');
var Channel = require('../models/channel');

// Endpoint to create a new group
router.post('/create-group', async (req, res) => {
    console.log('Create group endpoint hit');
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
});

router.get('/all-groups', async (req, res) => {
    try {
        const groups = await Group.find({});
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/create-channel', async (req, res) => {
    console.log('Backend - /create-channel endpoint hit');
    console.log('Request Body:', req.body);
    const { groupId, channelName } = req.body;
    try {
        const group = await Group.findById(groupId);
        
        // Create the channel in the Channel model
        const newChannel = new Channel({
            name: channelName,
            group: groupId
        });
        await newChannel.save();

        // Push the ObjectId of the newly created channel into the group's channels array
        group.channels.push(newChannel._id);
        await group.save();

        res.status(200).send('Channel created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/channels/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    try {
        const group = await Group.findById(groupId);
        res.status(200).json(group.channels);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;