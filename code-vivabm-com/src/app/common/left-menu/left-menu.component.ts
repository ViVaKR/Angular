import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Output, signal, viewChild } from '@angular/core';
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
  isStatus = signal(false);

  router = inject(Router);

  @Output() clickedMenu = new EventEmitter<IMenu>();

  cdref = inject(ChangeDetectorRef);
  onToggle() {

    this.isStatus.set(!this.isStatus());
    this.isStatus() ? this.accordion().openAll() : this.accordion().closeAll();
    this.cdref.detectChanges();

  }
  accordion = viewChild.required(MatAccordion);

  leftMeuns: ILeftMenu[] = [
    {
      id: 1, title: "", description: "Boot Camp", icon: "stack",
      menus: [
        { id: 3, title: "Katex/Latex Camp", url: "KatexLatexCamp", icon: "stack", param: false },
        { id: 1, title: "Markdown Camp", url: "MarkDownCamp", icon: "stack", param: false },
        { id: 2, title: "Meraid Camp", url: "MermaidCamp", icon: "stack", param: false },
        { id: 4, title: "Vim Camp", url: "VimCamp", icon: "stack", param: false },
        { id: 5, title: "Git Camp", url: "GitCamp", icon: "stack", param: false },
        { id: 6, title: "Docker Camp", url: "DockerCamp", icon: "stack", param: false },
        { id: 7, title: "Bash Shell", url: "ShellScriptCamp", icon: "stack", param: false },
        { id: 8, title: "PowerShell", url: "PowerShellCamp", icon: "stack", param: false },
      ]
    },
    {
      id: 2, title: "", description: "DOTNET", icon: "stack",
      menus: [
        { id: 1, title: "C#", url: "CsharpCamp", icon: "stack", param: false },
        { id: 2, title: "ASP.NET Core", url: "AspNetCoreCamp", icon: "stack", param: false },
        { id: 3, title: "Blazor", url: "BlazorCamp", icon: "stack", param: false }
      ]
    },
    {
      id: 3, title: "", description: "Web", icon: "stack",
      menus: [
        { id: 1, title: "HTML/CSS", url: "HtmlCssCamp", icon: "stack", param: false },
        { id: 2, title: "JavaScript", url: "JavaScriptCamp", icon: "stack", param: false },
        { id: 3, title: "NodeJS", url: "NodeJsCamp", icon: "stack", param: false },
        { id: 4, title: "NginX", url: "NginXCamp", icon: "stack", param: false },
      ]
    },
    {
      id: 4, title: "", description: "System", icon: "stack",
      menus: [
        { id: 1, title: "Rust", url: "RustCamp", icon: "stack", param: false },
        { id: 2, title: "Go", url: "GoCamp", icon: "stack", param: false },
        { id: 3, title: "SQL", url: "SqlCamp", icon: "stack", param: false },

      ]
    },
    {
      id: 5, title: "", description: "Solutions", icon: "stack",
      menus: [
        { id: 1, title: "Solution", url: "Solution", icon: "stack", param: false }
      ]
    },
  ];

  home: IMenu = { id: 0, title: "BootCamp", url: "BootCamp", icon: "home", param: false };

  toggle = [
    'expand_all',
    'collapse_all',
  ]


  goTo(menu: IMenu) {
    this.clickedMenu.emit(menu);
  }
}
