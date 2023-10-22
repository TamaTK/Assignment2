import { UserModel } from '../models/user';
import { ChannelModel } from '../models/channel';

/* Groups should have an ID, even though Names should probably be unique. Groups should 
have an array of admin users, an array of channels within the group, and an array of members
in the group. */
export class GroupModel {
    id: number; 
    name: string; 
    admins: UserModel[];
    channels: ChannelModel[];
    members: UserModel[];
  
    constructor(id: number, name: string, admins: UserModel[], channels: ChannelModel[], members: UserModel[]) {
      this.id = id;
      this.name = name;
      this.admins = admins;
      this.channels = channels;
      this.members = members;
    }
  }