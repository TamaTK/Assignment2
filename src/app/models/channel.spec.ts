import { ChannelModel } from './channel';

const dummyChannel = new ChannelModel(
  1, // id
  'Test Channel', // name
  1, // groupId
  [] // members (empty array for this example)
);

describe('ChannelModel', () => {
  it('should create an instance', () => {
    expect(dummyChannel).toBeTruthy();
  });
});
