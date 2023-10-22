var express = require('express');
var router = express.Router();
var Group = require('../models/group');

// Endpoint to create a new group
router.post('/create-group', async (req, res) => {
    console.log('Create group endpoint hit');
    try {
        const { name, userId } = req.body;
        // Check if group with the same name already exists
        const existingGroup = await Group.findOne({ name: name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group with this name already exists', newgroup: { newGroup } });
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

router.post('/join-group', async (req, res) => {
    const { groupId, userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
            res.status(200).json({ message: 'Joined group successfully' });
        } else {
            res.status(400).send('User already a member of the group');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/create-channel', async (req, res) => {
    const { groupId, channelName } = req.body;
    try {
        const group = await Group.findById(groupId);
        const channel = {
            name: channelName,
            messages: []
        };
        group.channels.push(channel);
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