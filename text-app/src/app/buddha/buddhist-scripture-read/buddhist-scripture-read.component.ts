import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { HighlightAuto } from 'ngx-highlightjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { HangulOrder } from '@app/types/hangul-order';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buddhist-scripture-read',
  standalone: true,
  imports: [
    AllMatModule,
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './buddhist-scripture-read.component.html',
  styleUrl: './buddhist-scripture-read.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers],
})
@Injectable({
  providedIn: 'root'

})
export class BuddhistScriptureReadComponent implements OnInit {

  id!: number;
  title!: string;
  subtitle!: string;
  author!: string;
  translator!: string;
  summary!: string;
  sutra!: string;
  originalText!: string;
  annotation!: string;
  hangulOrder!: HangulOrder;

  @Input() mainTitle?: string;
  fontSize = 'text-3xl';

  constructor(private router: Router, private service: BuddhaService, private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    // 파라미터를 받아오기 위해 ActivatedRoute를 사용한다.
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.id = params['id'] as number; // id 파라미터를 받아온다.

        if (this.id === null || this.id === undefined) { this.id = 1; } // id가 없으면 1로 초기화한다.

        this.service.getScriptureById(this.id).subscribe({ // id로 서버에 요청한다.
          next: (data: BuddistScripture) => {
            if (data != null) {
              this.id = data.id;
              this.title = data.title ?? "-";
              this.mainTitle = data.title ?? "-";
              this.subtitle = data.subtitle ?? "-";
              this.author = data.author ?? "-";
              this.translator = data.translator ?? "-";
              this.summary = data.summary ?? "-";
              this.sutra = data.sutra ?? "-";
              this.originalText = data.originalText ?? "-";
              this.annotation = data.annotation ?? "-";
              this.hangulOrder = data.hangulOrder ?? HangulOrder.가;
            }
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onDelete() {
    this.service.deleteScripture(this.id).subscribe({
      next: () => {
        this.openSnackBar(`Scripture deleted ( ${this.id} ) successfully`, 'Delete Success!');
        this.router.navigate(['Buddha']).then(() => { window.location.reload(); });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  goNavigate(id: number) {
    this.router.navigate(['Update'], { queryParams: { id } });
  }
  tabs = ['1 장', '2 장', '3 장', '4 장', '5 장'];
  increaseFontSize() {
    this.fontSize = 'text-3xl font-bold';
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
}
