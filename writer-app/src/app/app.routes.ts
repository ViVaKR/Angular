import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './membership/user-list/user-list.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { ProfileComponent } from './membership/profile.component';
import { PlaygroundComponent } from './playground/playground.component';
import { RoleListComponent } from './membership/role-list/role-list.component';
import { RoleComponent } from './membership/role/role.component';
import { CodeComponent } from './code/code.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Code', component: CodeComponent },
    { path: 'Profile', component: ProfileComponent },
    { path: 'UserList', component: UserListComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    { path: 'Playground', component: PlaygroundComponent },
    { path: 'RoleList', component: RoleListComponent },
    { path: 'Role', component: RoleComponent },
    { path: '**', redirectTo: 'Home' }
];
