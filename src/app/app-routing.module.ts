// imported components
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { GroupManagementComponent } from './group-management/group-management.component';


// imported other
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // generated component routes
  { path: 'login', component: LoginComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'channels/:groupId', component: ChannelsComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'group-management', component: GroupManagementComponent },
  // home
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
