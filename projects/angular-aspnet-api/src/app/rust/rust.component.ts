import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rust',
  templateUrl: './rust.component.html',
  styleUrls: ['./rust.component.css']
})
export class RustComponent {

  mainTitle: string = "Rust";
  
  category: number = 40;
  
  columns = ["id", "title"];
  
  display = ["번호", "제목"];
  
}
