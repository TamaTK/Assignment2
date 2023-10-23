const User = require('../models/user');

exports.getUserId = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json({ userId: user._id });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.registerNewUser = async (req, res) => {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
  
      // Find the default role
      const userRole = await Role.findOne({ roleName: 'User' });
      if (!userRole) {
        return res.status(500).send('Default role not found');
      }
  
      // Create a new user with the default role
      const user = new User({
        username: req.body.username,
        // other fields...
        roles: [userRole._id], // Assign the default role
      });
  
      // Save the user
      await user.save();
  
      // Respond with a message or token as per your existing functionality
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
};