import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatIcon, MatAnchor],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  private router = inject(Router);

  year: number = new Date().getFullYear();

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
