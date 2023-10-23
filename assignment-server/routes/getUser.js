const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/get-user-id/:username', userController.getUserId);

module.exports = router;
