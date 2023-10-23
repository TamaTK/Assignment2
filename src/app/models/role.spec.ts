import { RoleModel } from './role';

const dummyRole = new RoleModel(
  1, // id
  'Test Role' // name
);

describe('RoleModel', () => {
  it('should create an instance', () => {
    expect(dummyRole).toBeTruthy();
  });
});