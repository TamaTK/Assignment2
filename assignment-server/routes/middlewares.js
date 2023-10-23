const checkPermissions = (requiredRole = null) => {
    return async (req, res, next) => {
      try {
        // Check and decode token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key
  
        // Get user with role
        const user = await User.findById(decoded.id).populate('roles');
  
        if (!user) {
          return res.status(401).send('Authentication failed.');
        }
  
        if (requiredRole) {
          // Check user's role
          const roles = user.roles.map(role => role.name);
          if (roles.includes(requiredRole) || roles.includes('Super Admin')) {
            req.user = user;
            next();
          } else {
            return res.status(403).send('Forbidden: You do not have permission.');
          }
        } else {
          req.user = user;
          next();
        }
      } catch (error) {
        return res.status(401).send('Authentication failed.');
      }
    };
  };
  
    module.exports = checkPermissions;  