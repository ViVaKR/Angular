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

export const routes: Routes = [
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Dashboard', component: DashBoardComponent },
    { path: 'AddressForm', component: AddressFormComponent },
    { path: 'Table', component: TableComponent },
    { path: 'DragDrop', component: DragDropComponent },
    {
        path: 'Buddha', component: BuddhaComponent, children: [
            { path: 'BuddhistScriptureList', component: BuddhistScriptureListComponent },
            { path: 'BuddistScriptureCreate', component: BuddhistScriptureCreateComponent },
            { path: 'BuddistScriptureRead', component: BuddhistScriptureReadComponent },
            { path: 'BuddistScriptureRead/:id', component: BuddhistScriptureReadComponent },
            { path: 'BuddistScriptureUpdate', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddhistScriptureUpdate/:id', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddistScriptureDelete', component: BuddhistScriptureDeleteComponent },
            { path: 'BuddistScriptureDelete/:id', component: BuddhistScriptureDeleteComponent },
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

    { path: '**', redirectTo: 'Home' }
];
