import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BibleComponent } from './bible/bible.component';
import { CategoryComponent } from './category/category.component';
import { BibleListComponent } from './bible/bible-list/bible-list.component';
import { BibleWriteUpdateComponent } from './bible/bible-write-update/bible-write-update.component';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';
import { ExportDataComponent } from './export-data/export-data.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'BibleList', component: BibleListComponent },
    { path: 'Category', component: CategoryComponent },
    { path: 'ExportData', component: ExportDataComponent },
    {
        path: 'Bible', component: BibleComponent, children: [
            { path: '', redirectTo: 'BibleList', pathMatch: 'full' },
            { path: 'BibleList', component: BibleListComponent },
            { path: 'BibleWriteUpdate', component: BibleWriteUpdateComponent },
            { path: '**', redirectTo: 'BibleList' }
        ]
    },
    { path: 'MenuBar', component: NavMenuBarComponent },
    { path: 'BibleWrite', component: BibleWriteUpdateComponent },
    { path: "**", redirectTo: 'Home' }
];
