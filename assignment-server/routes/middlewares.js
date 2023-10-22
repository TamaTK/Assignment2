function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        next(); // User is authenticated, proceed to the next middleware/route
    } else {
        res.status(401).send('Authentication required'); // User is not authenticated
    }
}

module.exports = {
    isAuthenticated
};
