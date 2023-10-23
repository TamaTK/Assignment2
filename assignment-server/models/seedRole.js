// Seed the Super Admin role with its permissions
await Role.create({
    roleName: 'SuperAdmin',
    rolePermissions: [
      'promoteGroupAdmin',
      'removeChatUsers',
      'upgradeSuperAdmin',
      'manageAllGroups'
    ],
  });
  
  // Seed the Group Admin role with its permissions
  await Role.create({
    roleName: 'GroupAdmin',
    rolePermissions: [
      'createNewGroups',
      'createNewChannels',
      'assignUsersToChannels',
      'manageGroupMembers',
      'deleteChatMembers',
      'manageOwnGroup',
      'banFromChannel'
    ],
  });
  
  // Seed the User role with its permissions
  await Role.create({
    roleName: 'User',
    rolePermissions: [
      'registerChat',
      'exitGroup',
      'selfDeletion'
    ],
  });
  