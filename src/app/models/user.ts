import { GroupModel } from './group';

export class UserModel {
    _id: string; // MongoDB uses string-based Object IDs
    username: string; 
    email: string; 
    roles: string[]; // ['chatUser', 'groupAdmin', 'superAdmin']
    groups: GroupModel[]; // Depending on how detailed the GroupModel is
  
    constructor(id: string, username: string, email: string, roles: string[], groups: GroupModel[]) {
      this._id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
      this.groups = groups;
    }
}