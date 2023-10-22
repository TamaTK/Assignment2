var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST register user. */
router.post('/', async function(req, res, next) {
  try {
    // Validate request body
    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Request missing username or password param');
    }

    let user = await User.findOne({ username: req.body.username });
    
    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new User({
      username: req.body.username,
      // other fields can be added here
      password: req.body.password,
    });

    await user.save();

    res.status(201).send('User created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
