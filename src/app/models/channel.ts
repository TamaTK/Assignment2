import { UserModel } from '../models/user';

/* Channels only need an array of Users within the group, and a Group ID. Information about roles
should probably come from the Group, not the Channel. */ 
export class ChannelModel {
    id: number;
    name: string;
    groupId: number;
    members: UserModel[];
  
    constructor(id: number, name: string, groupId: number, members: UserModel[]) {
      this.id = id;
      this.name = name;
      this.groupId = groupId;
      this.members = members;
    }
  }