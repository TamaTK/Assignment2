const User = require('../models/user');

exports.login = async (req, res) => {
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
        res.status(200).json({ message: 'Authentication successful', user: { id: user._id, username: user.username } });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.register = async (req, res) => {
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
};
