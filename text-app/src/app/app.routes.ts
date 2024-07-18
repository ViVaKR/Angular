import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuddhistScriptureListComponent } from './buddha/buddhist-scripture-list/buddhist-scripture-list.component';
import { BuddhistScriptureCreateComponent } from './buddha/buddhist-scripture-create/buddhist-scripture-create.component';
import { BuddhistScriptureReadComponent } from './buddha/buddhist-scripture-read/buddhist-scripture-read.component';
import { BuddhistScriptureUpdateComponent } from './buddha/buddhist-scripture-update/buddhist-scripture-update.component';
import { BuddhistScriptureDeleteComponent } from './buddha/buddhist-scripture-delete/buddhist-scripture-delete.component';
import { BuddhaComponent } from './buddha/buddha.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddressFormComponent } from './schematics/address-form/address-form.component';
import { TableComponent } from './schematics/table/table.component';
import { DragDropComponent } from './schematics/drag-drop/drag-drop.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { CancelMembershipComponent } from './membership/cancel-membership/cancel-membership.component';
import { FindMembershipComponent } from './membership/find-membership/find-membership.component';
import { ProfileComponent } from './membership/profile.component';
import { MyInfoComponent } from './membership/my-info/my-info.component';
import { ChangePasswordComponent } from './membership/change-password/change-password.component';
import { SignOutComponent } from './membership/sign-out/sign-out.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'AddressForm', component: AddressFormComponent },
    { path: 'Table', component: TableComponent },
    { path: 'DragDrop', component: DragDropComponent },
    {
        path: 'Buddha', component: BuddhaComponent, children: [
            { path: '', redirectTo: 'BuddhistScriptureList', pathMatch: 'full' },
            { path: 'BuddhistScriptureList', component: BuddhistScriptureListComponent },
            { path: 'BuddhistScriptureCreate', component: BuddhistScriptureCreateComponent },
            { path: 'BuddhistScriptureRead', component: BuddhistScriptureReadComponent },
            { path: 'BuddhistScriptureRead/:id', component: BuddhistScriptureReadComponent },
            { path: 'BuddhistScriptureUpdate', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddhistScriptureUpdate/:id', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddhistScriptureDelete', component: BuddhistScriptureDeleteComponent },
            { path: 'BuddhistScriptureDelete/:id', component: BuddhistScriptureDeleteComponent },
            { path: '**', redirectTo: 'BuddhistScriptureList' }
        ],
    },
    { path: 'Profile', component: ProfileComponent },
    {
        path: 'Profile', component: ProfileComponent,
        children: [
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
            { path: 'Dashboard', component: DashBoardComponent },
            { path: 'MyInfo', component: MyInfoComponent },
            { path: 'SignIn', component: SignInComponent },
            { path: 'SignUp', component: SignUpComponent },
            { path: 'SignOut', component: SignOutComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent },
            { path: 'Cancel', component: CancelMembershipComponent },
            { path: 'Cancel/:id', component: CancelMembershipComponent },
            { path: 'FindPassword', component: FindMembershipComponent },
            { path: '**', redirectTo: 'Dashboard' }
        ]
    },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },


    { path: '**', redirectTo: 'Home' }
];
