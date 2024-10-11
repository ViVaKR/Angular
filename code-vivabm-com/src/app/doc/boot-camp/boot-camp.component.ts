import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentRef, inject, Input, OnInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownCampComponent } from "../markdown-camp/markdown-camp.component";
import { MermaidCampComponent } from '../mermaid-camp/mermaid-camp.component';
import { NgFor, NgIf } from '@angular/common';
import { HomeComponent } from '@app/home/home.component';
import { DockerCampComponent } from '../docker-camp/docker-camp.component';
import { GitCampComponent } from '../git-camp/git-camp.component';
import { ViCampComponent } from '../vi-camp/vi-camp.component';
import { CsharpCampComponent } from '../csharp-camp/csharp-camp.component';
import { AspNetCoreCampComponent } from '../asp-net-core-camp/asp-net-core-camp.component';
import { BlazorCampComponent } from '../blazor-camp/blazor-camp.component';
import { HtmlCssCampComponent } from '../html-css-camp/html-css-camp.component';
import { JavaScriptCampComponent } from '../java-script-camp/java-script-camp.component';
import { NodeJsCampComponent } from '../node-js-camp/node-js-camp.component';
import { AngularCampComponent } from '../angular-camp/angular-camp.component';
import { RustCampComponent } from '../rust-camp/rust-camp.component';
import { CCampComponent } from '../c-camp/c-camp.component';
import { CppCampComponent } from '../cpp-camp/cpp-camp.component';
import { GoCampComponent } from '../go-camp/go-camp.component';
import { RCampComponent } from '../r-camp/r-camp.component';
import { ShellScriptCampComponent } from '../shell-script-camp/shell-script-camp.component';
import { PowerShellCampComponent } from '../power-shell-camp/power-shell-camp.component';

@Component({
  selector: 'app-boot-camp',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MarkdownCampComponent,
    MermaidCampComponent,
    NgIf,
    NgFor

  ],
  templateUrl: './boot-camp.component.html',
  styleUrl: './boot-camp.component.scss'
})
export class BootCampComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() title: any = '신병 훈련소';

  tabs = [
    { title: "MarkDown", component: MarkdownCampComponent },
    { title: 'Mermaid', component: MermaidCampComponent },
    { title: 'Vim', component: ViCampComponent },
    { title: 'Git', component: GitCampComponent },
    { title: 'Docker', component: DockerCampComponent },

    { title: 'C#', component: CsharpCampComponent },
    { title: 'ASP.NET Core', component: AspNetCoreCampComponent },
    { title: 'Blazor', component: BlazorCampComponent },

    { title: 'HTML/CSS', component: HtmlCssCampComponent },
    { title: 'JavaScript', component: JavaScriptCampComponent },
    { title: 'NodeJs', component: NodeJsCampComponent },
    { title: 'Anuglar', component: AngularCampComponent },

    { title: 'Rust', component: RustCampComponent },
    { title: 'R', component: RCampComponent },
    { title: 'C', component: CCampComponent },
    { title: 'C++', component: CppCampComponent },
    { title: 'Go', component: GoCampComponent },

    { title: 'Shell', component: ShellScriptCampComponent },
    { title: 'PowerShell', component: PowerShellCampComponent },




  ];

  selected = new FormControl(0);

  @ViewChildren('dynamicComponentContainer', { read: ViewContainerRef }) containers!: QueryList<ViewContainerRef>;
  private componentRefs: ComponentRef<any>[] = [];
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // ViewChild가 초기화된 후에 첫 번째 컴포넌트를 로드합니다.
    this.loadComponent(this.tabs[0].component, 0);
  }
  ngAfterViewChecked(): void {
    // 변경 감지 후에 강제로 변경 감지를 실행합니다.
    this.cdr.detectChanges();
  }

  addTab(selectAfterAdding: boolean) {
    this.tabs.push({ title: 'Mermaid', component: MarkdownCampComponent });
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
      this.loadComponent(this.tabs[this.tabs.length - 1].component, this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs.length > 0) {
      this.selected.setValue(index > 0 ? index - 1 : 0);
      this.loadComponent(this.tabs[this.selected.value].component, this.selected.value);
    } else {
      this.containers.forEach(container => container.clear());
    }
  }

  isComponent(component: any): boolean {
    return typeof component === 'function';
  }

  loadComponent(component: Type<any>, index: number): void {
    if (this.isComponent(component)) {
      if (this.componentRefs[index]) {
        this.componentRefs[index].destroy();
      }
      const container = this.containers.toArray()[index];
      this.componentRefs[index] = container.createComponent(component);
      this.cdr.detectChanges(); // 변경 감지 주기를 강제로 실행
    }
  }

  onTabChange(index: number): void {

    this.loadComponent(this.tabs[index].component, index);
    this.selected.setValue(index);
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
