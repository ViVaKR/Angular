import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BibleComponent } from './bible/bible.component';
import { CategoryComponent } from './category/category.component';
import { BibleListComponent } from './bible/bible-list/bible-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'BibleList', component: BibleListComponent },
    { path: 'Category', component: CategoryComponent },
    {
        path: 'Bible', component: BibleComponent, children: [
            { path: '', redirectTo: 'BibleList', pathMatch: 'full' },
            { path: 'BibleList', component: BibleListComponent },
            { path: '**', redirectTo: 'BibleList' }
        ]
    },
    { path: "**", redirectTo: 'Home' }
];
