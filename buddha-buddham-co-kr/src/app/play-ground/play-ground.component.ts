import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPlayGround } from '@app/interfaces/i-play-ground';
import { IResponse } from '@app/interfaces/i-response';
import { PlaygroundService } from '@app/services/playground.service';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss'
})
export class PlayGroundComponent {

  playgroundService = inject(PlaygroundService);
  snackBar = inject(MatSnackBar);

  postPlayground() {

    var nums: number[] = [...Array(10).keys()];
    const data: IPlayGround = {
      id: 0,
      text: 'Hello World',
      createdAt: new Date(),
      ModifiedAt: new Date(),
      numbers: nums,
    };
    this.playgroundService.postPlayground(data).subscribe({
      next: (data: IResponse) => {
        console.log(data);
        this.snackBar.open('Playground posted successfully', '닫기', {
          duration: 2000
        });
      },
      error: (err: HttpErrorResponse) => {
        let ref = this.snackBar.open(err.message, '닫기', {
          duration: 10000
        });

        ref.onAction().subscribe(() => {
          ref.dismiss();
        });
      }
    });
  }
}
