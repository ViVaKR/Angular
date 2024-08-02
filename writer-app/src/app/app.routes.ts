import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './membership/user-list/user-list.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { ProfileComponent } from './membership/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Profile', component: ProfileComponent },
    { path: 'UserList', component: UserListComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    { path: '**', redirectTo: 'Home' }
];
