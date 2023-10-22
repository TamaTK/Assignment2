var User = require('../models/user');
var express = require('express');
var router = express.Router();


router.post('/', async function(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user by username
        let user = await User.findOne({ username: username });

        console.log('Queried user:', user);  // Log the user returned from the database

        // If user not found
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // If user found, compare the provided password with the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        // If authentication is successful
        req.session.user = {
            id: user._id,
            username: user.username
        };
        res.status(200).json({ message: 'Authentication successful', user: { username } });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;