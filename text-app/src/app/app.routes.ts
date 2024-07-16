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
import { Component } from '@angular/core';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { MyProfileComponent } from './membership/my-profile/my-profile.component';
import { CancelMembershipComponent } from './membership/cancel-membership/cancel-membership.component';
import { FindMembershipComponent } from './membership/find-membership/find-membership.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Dashboard', component: DashBoardComponent },
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
    { path: 'Buddha/:id', component: BuddhaComponent },
    { path: 'List', component: BuddhistScriptureListComponent },
    { path: 'Create', component: BuddhistScriptureCreateComponent },
    { path: 'Read', component: BuddhistScriptureReadComponent },
    { path: 'Read/:id', component: BuddhistScriptureReadComponent },
    { path: 'Update', component: BuddhistScriptureUpdateComponent },
    { path: 'Update/:id', component: BuddhistScriptureUpdateComponent },
    { path: 'Delete', component: BuddhistScriptureDeleteComponent },
    { path: 'Delete/:id', component: BuddhistScriptureDeleteComponent },

    // MemberShip
    { path: 'FindMembership', component: FindMembershipComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    {
        path: 'MemberShip', component: MembershipComponent,
        children: [
            { path: '', redirectTo: 'MyProfile', pathMatch: 'full' },
            { path: 'MyProfile', component: MyProfileComponent },
            { path: 'CancelMembership', component: CancelMembershipComponent },
            { path: 'SignIn', component: SignInComponent },
            { path: 'SignUp', component: SignUpComponent },
            { path: '**', redirectTo: 'MyProfile' }
        ]
    },

    { path: '**', redirectTo: 'Home' }
];
