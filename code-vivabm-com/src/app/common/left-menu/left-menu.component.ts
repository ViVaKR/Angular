import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ILeftMenu } from '@app/interfaces/i-left-menu';
import { IMenu } from '@app/interfaces/i-menu';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuComponent {
  accordion = viewChild.required(MatAccordion);

  leftMeuns: ILeftMenu[] = [
    {
      id: 1, title: "", description: "기초 강좌", icon: "stack",
      menus: [
        { id: 1, title: "Markdown Camp", url: "MarkDownCamp", icon: "stack", param: false },
        { id: 2, title: "Meraid Camp", url: "MermaidCamp", icon: "stack", param: false },
        { id: 3, title: "Vim Camp", url: "VimCamp", icon: "stack", param: false },
        { id: 4, title: "Git Camp", url: "GitCamp", icon: "stack", param: false },
        { id: 5, title: "Docker Camp", url: "DockerCamp", icon: "stack", param: false },
      ]
    },
    {
      id: 2, title: "", description: ".NET", icon: "stack",
      menus: [
        { id: 1, title: "C# 기초강좌", url: "/CSharp", icon: "icon", param: false },
        { id: 2, title: "ASP.NET Core", url: "/AspNetCore", icon: "icon", param: false },
        { id: 3, title: "Blazor", url: "/Blazor", icon: "icon", param: false },
        { id: 3, title: "MAUI", url: "/MAUI", icon: "icon", param: false },
      ]
    },
    {
      id: 3, title: "", description: "Rust", icon: "stack",
      menus: [
        { id: 1, title: "Rust Startup", url: "/RustStartup", icon: "icon", param: false },
      ]
    },
  ];

  home: IMenu = { id: 0, title: "BootCamp", url: "BootCamp", icon: "home", param: false };

  toggle = [
    'expand_all',
    'collapse_all',
  ]

  isStatus = false;

  router = inject(Router);

  @Output() clickedMenu = new EventEmitter<IMenu>();

  goTo(menu: IMenu) {
    this.clickedMenu.emit(menu);
  }
}
