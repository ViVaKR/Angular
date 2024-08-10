import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { CodeComponent } from './code/code.component';
import { CodeListComponent } from './code/code-list/code-list.component';
import { CodeReadComponent } from './code/code-read/code-read.component';
import { CodeCreateComponent } from './code/code-create/code-create.component';
import { CodeUpdateComponent } from './code/code-update/code-update.component';
import { CodeDeleteComponent } from './code/code-delete/code-delete.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Category', component: CategoryComponent },
    {
        path: 'Code', component: CodeComponent, children: [
            { path: '', redirectTo: 'CodeList', pathMatch: 'full' },
            { path: 'CodeList', component: CodeListComponent },
            { path: 'CodeCreate', component: CodeCreateComponent },
            { path: 'CodeRead', component: CodeReadComponent },
            { path: 'CodeRead/:id', component: CodeReadComponent },
            { path: 'CodeUpdate', component: CodeUpdateComponent },
            { path: 'CodeUpdate/:id', component: CodeUpdateComponent },
            { path: 'CodeDelete', component: CodeDeleteComponent },
            { path: 'CodeDelete/:id', component: CodeDeleteComponent },
            { path: '**', redirectTo: 'CodeList' }
        ]
    },
    { path: '**', redirectTo: 'Home' }

];
