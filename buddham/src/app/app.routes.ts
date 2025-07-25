import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Texts } from './texts/texts';
import { Auth } from './services/auth';
import { Membership } from './membership/membership';
import { Login } from './membership/login/login';


export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: Home },
    { path: 'Texts', component: Texts },
    { path: 'Auth', component: Auth },
    { path: 'Membership', component: Membership },
    { path: 'Login', component: Login },
    { path: '**', redirectTo: 'Home' }
];
