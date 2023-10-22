var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.send('hello with a resource');
});

// Handle POST requests for the /login endpoint
router.post('/', function(req, res) {
  console.log('Received a login request from login.js');
  const { username, password } = req.body;

  if (username === 'super' && password === '123') {
    // Authentication successful
    res.status(200).json({ message: 'Authentication successful', user: { username } }); 
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = router;