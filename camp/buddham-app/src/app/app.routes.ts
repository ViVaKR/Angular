import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PalmanDaeJangGyeongComponent } from './palman-dae-jang-gyeong/palman-dae-jang-gyeong.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { SignOutComponent } from './admin/sign-out/sign-out.component';
import { BuddhistScriptureComponent } from './buddhist-scripture/buddhist-scripture.component';

// --> Buddhist Scripture
import { BuddhistScriptureDetailComponent } from './buddhist-scripture/buddhist-scripture-detail/buddhist-scripture-detail.component';
import { BuddhistScriptureListComponent } from './buddhist-scripture/buddhist-scripture-list/buddhist-scripture-list.component';
import { BuddhistScriptureCreateComponent } from './buddhist-scripture/buddhist-scripture-create/buddhist-scripture-create.component';
import { BuddhistScriptureEditComponent } from './buddhist-scripture/buddhist-scripture-edit/buddhist-scripture-edit.component';
import { BuddhistScriptureDeleteComponent } from './buddhist-scripture/buddhist-scripture-delete/buddhist-scripture-delete.component';

export const routes: Routes = [
    { path: '', redirectTo: 'BuddistScripture', pathMatch: 'full' },
    { path: 'List', component: BuddhistScriptureListComponent },
    {
        path: 'BuddistScripture', component: BuddhistScriptureComponent,
        children: [
            { path: 'Create', component: BuddhistScriptureCreateComponent },
            { path: 'Detail/:id', component: BuddhistScriptureDetailComponent },
            { path: 'Edit/:id', component: BuddhistScriptureEditComponent },
            { path: 'Delete/:id', component: BuddhistScriptureDeleteComponent }
        ]
    },

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
