import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PalmanDaeJangGyeongComponent } from './palman-dae-jang-gyeong/palman-dae-jang-gyeong.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { SignOutComponent } from './admin/sign-out/sign-out.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'PalmanDaeJangGyeong', component: PalmanDaeJangGyeongComponent },
    {
        path: 'Admin', component: AdminMainComponent, children: [
            { path: 'SignUp', component: SignUpComponent },
            { path: "SignIn", component: SignInComponent },
            { path: "SignOut", component: SignOutComponent },
        ]
    },
    { path: '**', redirectTo: 'Home' }
];
