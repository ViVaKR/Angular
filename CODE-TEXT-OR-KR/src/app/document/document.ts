import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {documentMenu} from "@data/menu-data";
import {IMenu} from "@app/interfaces/i-menu";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-document',
    imports: [
        MatIconModule,
        MatIconButton,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
    ],
    templateUrl: './document.html',
    styleUrl: './document.scss'
})
export class Document {
    menus: IMenu[] = documentMenu;
}
