import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './membership/user-list/user-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user-list', component: UserListComponent },
    { path: '**', redirectTo: 'home' }
];
