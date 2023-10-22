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
            return res.status(400).send('Group with this name already exists.');
        }

        // Create a new group
        const newGroup = new Group({
            name: name,
            admins: [userId],
            members: [userId]
        });

        await newGroup.save();

        res.status(201).send('Group created successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;