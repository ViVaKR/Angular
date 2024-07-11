import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuddhistScriptureListComponent } from './buddha/buddhist-scripture-list/buddhist-scripture-list.component';
import { BuddhistScriptureCreateComponent } from './buddha/buddhist-scripture-create/buddhist-scripture-create.component';
import { BuddhistScriptureReadComponent } from './buddha/buddhist-scripture-read/buddhist-scripture-read.component';
import { BuddhistScriptureUpdateComponent } from './buddha/buddhist-scripture-update/buddhist-scripture-update.component';
import { BuddhistScriptureDeleteComponent } from './buddha/buddhist-scripture-delete/buddhist-scripture-delete.component';
import { BuddhaComponent } from './buddha/buddha.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    {
        path: 'Buddha', component: BuddhaComponent, children: [
            { path: 'BuddhistScriptureList', component: BuddhistScriptureListComponent },
            { path: 'BuddistScriptureCreate', component: BuddhistScriptureCreateComponent },
            { path: 'BuddistScriptureRead', component: BuddhistScriptureReadComponent },
            { path: 'BuddistScriptureUpdate', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddistScriptureDelete', component: BuddhistScriptureDeleteComponent },
        ]
    },
    { path: '**', redirectTo: 'Home' }
];
