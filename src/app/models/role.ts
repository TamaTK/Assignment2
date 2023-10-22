export class RoleModel {
    id: number; 
    name: string; // Role name (e.g., "Super Admin", "Group Admin", "Chat User")
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }