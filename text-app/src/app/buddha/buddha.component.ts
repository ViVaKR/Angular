import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';

import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { map, Observable, of } from 'rxjs';

import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HangulOrderArray } from '@app/types/hangul-order';

@Component({
  selector: 'app-buddha',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    AllMatModule
  ],
  templateUrl: './buddha.component.html',
  styleUrl: './buddha.component.scss'
})
export class BuddhaComponent implements OnInit, AfterViewInit {

  readonly panelOpenState = signal(false);

  readonly kors = HangulOrderArray.sort((a, b) => a.key.localeCompare(b.key));
  service = inject(BuddhaService);
  sutras$!: Observable<BuddistScripture[]>;
  constructor(private router: Router, private route: ActivatedRoute, private buddhaService: BuddhaService) { }

  ngAfterViewInit(): void {
    this.buddhaService.getScriptures().subscribe({

    })
  }

  ngOnInit(): void {
    this.sutras$ = this.service.getScriptures();
  }

  readUrl = '/BuddistScriptureRead';

  goNavigate(id: number) {
    this.router.navigate(['BuddistScriptureRead'], { relativeTo: this.route, queryParams: { id } });
  }
}
