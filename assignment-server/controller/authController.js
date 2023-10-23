const User = require('../models/user');

exports.login = async (req, res) => {
  try {
    // ... existing login logic ...

    // Find the user to get their role
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Auth failed" });
    }

    // ... existing token creation logic ...

    // Include the user's role in the response alongside the token
    res.status(200).json({
      message: "Auth successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role // Ensure 'role' is part of your User model schema
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
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
