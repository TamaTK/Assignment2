const Role = require('../models/roleModel');

// Create a new role
const createRole = async (req, res) => {
  const { name, permissions } = req.body;

  // Check for missing name or permissions
  if(!name || !permissions || !permissions.length) {
    return res.status(400).send('Missing name or permissions.');
  }

  // Check if role already exists
  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    return res.status(400).send('Role already exists.');
  }

  // Create the role
  const role = new Role({
    name,
    permissions,
  });
  await role.save();

  res.status(201).send({ role });
};

module.exports = {
  createRole,
};
