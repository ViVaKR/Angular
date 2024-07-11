import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AllMatModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
