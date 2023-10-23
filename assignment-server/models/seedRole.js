// Seed the Super Admin role with its permissions
await Role.create({
    roleName: 'superAdmin',
    rolePermissions: [
      'promoteGroupAdmin',
      'removeChatUsers',
      'upgradeSuperAdmin',
      'manageAllGroups'
    ],
  });
  
  // Seed the Group Admin role with its permissions
  await Role.create({
    roleName: 'groupAdmin',
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
    roleName: 'chatUser',
    rolePermissions: [
      'registerChat',
      'exitGroup',
      'selfDeletion'
    ],
  });
  