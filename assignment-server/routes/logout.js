var express = require('express');
var router = express.Router();

/* GET logout user. */
router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to log out');
            } else {
                return res.redirect('/login'); // or res.send('Logged out successfully');
            }
        });
    } else {
        res.redirect('/login'); // or res.send('No active session found');
    }
});

module.exports = router;
