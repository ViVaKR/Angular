import { JsonPipe } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '@app/common/delete-dialog/delete-dialog.component';
import { DataService } from '@app/services/data.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buddhist-scripture-delete',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './buddhist-scripture-delete.component.html',
  styleUrl: './buddhist-scripture-delete.component.scss'
})
export class BuddhistScriptureDeleteComponent implements OnInit, OnDestroy {

  id!: number;
  subscription!: Subscription;
  route = inject(ActivatedRoute);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe({
      next: (params: any) => {
        this.id = params['id'] as number;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  openSnackBar = inject(MatSnackBar);

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
