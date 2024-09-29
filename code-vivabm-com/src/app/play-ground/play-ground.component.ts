import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChildActivationEnd } from '@angular/router';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [
    MatButtonModule,
    ChildComponent
  ],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss'
})
export class PlayGroundComponent implements OnInit {
  private _price: number;
  public name = "PlayGround";

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }


  ngOnInit(): void {
    this.price = 0;
  }

  onPriceChange(price: number) {
    this.price += price;
  }

}
