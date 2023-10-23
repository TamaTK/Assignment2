const express = require('express');
const router = express.Router();
const groupController = require('../controller/groupController');

router.post('/create-group', groupController.createGroup);
router.get('/all-groups', groupController.getAllGroups);
router.post('/create-channel', groupController.createChannel);
router.get('/get-group-channels/:groupId', groupController.getGroupChannels);
router.get('/get-channel-messages/:channelId', groupController.getChannelMessages);

module.exports = router;