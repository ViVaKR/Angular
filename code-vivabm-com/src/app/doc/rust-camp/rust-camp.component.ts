import { Component } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-rust-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './rust-camp.component.html',
  styleUrl: './rust-camp.component.scss'
})
export class RustCampComponent {
  title: any = 'Rust Camp';
  message: any = 'Rust 훈련소 준비중';

}
