const roleController = require('../controllers/roleController');
const express = require('express');


const router = new express.Router();

router.post('/create', roleController.createRole);

module.exports = router;
