import { ChannelModel } from './channel';
import { GroupModel } from './group';
import { UserModel } from './user';

const dummyChannel = new ChannelModel(
  1, // id
  'Test Channel', // name
  1, // groupId
  [] // members (empty array for this example)
);

const dummyGroup = new GroupModel(
  1, // id
  'Test Group', // name
  [], // admins (empty array for this example)
  [dummyChannel], // channels
  [] // members (empty array for this example)
);

const dummyUser = new UserModel(
  '12345', // id (string-based Object ID for MongoDB)
  'testUser', // username
  'test@example.com', // email
  ['chatUser'], // roles
  [dummyGroup] // groups
);

describe('UserModel', () => {
  it('should create an instance', () => {
    expect(dummyUser).toBeTruthy();
  });
});
