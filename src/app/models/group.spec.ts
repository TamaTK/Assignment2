import { ChannelModel } from './channel';
import { GroupModel } from './group';

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

describe('GroupModel', () => {
  it('should create an instance', () => {
    expect(dummyGroup).toBeTruthy();
  });
});
