import { Component, inject } from '@angular/core';
import { LeftMenuComponent } from "../common/left-menu/left-menu.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IMenu } from '@app/interfaces/i-menu';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftMenuComponent],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss'
})
export class DocComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  onClickedMenu($event: IMenu) {
    let param = { id: $event.id, title: $event.title, param: $event.param }

    this.router.navigate([$event.url], { relativeTo: this.route, queryParams: param });
  }

}
