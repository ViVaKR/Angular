import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from '@app/common/data-list/data-list.component';

@Component({
  selector: 'app-buddhist-scripture-list',
  standalone: true,
  imports: [
    CommonModule,
    DataListComponent
  ],
  templateUrl: './buddhist-scripture-list.component.html',
  styleUrl: './buddhist-scripture-list.component.scss'
})
export class BuddhistScriptureListComponent {

  title = '경전 목록';
}
