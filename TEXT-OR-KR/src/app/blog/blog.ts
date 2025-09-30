import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [
    CurrencyPipe,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog {

  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2025-09-30';

}
