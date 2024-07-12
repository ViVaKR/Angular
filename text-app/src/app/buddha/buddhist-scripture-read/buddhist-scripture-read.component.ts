import { Component, Input, OnInit } from '@angular/core';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { HighlightAuto } from 'ngx-highlightjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BuddhaService } from '@app/services/buddha.service';

@Component({
  selector: 'app-buddhist-scripture-read',
  standalone: true,
  imports: [
    AllMatModule,
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './buddhist-scripture-read.component.html',
  styleUrl: './buddhist-scripture-read.component.scss'
})
export class BuddhistScriptureReadComponent implements OnInit {
  sutra: string = '';
  @Input() mainTitle?: string = '법구경';

  fontSize = 'text-3xl';

  constructor(private router: Router, private service: BuddhaService, private route: ActivatedRoute) { }

  id: number = -1;
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.id = params['id'] as number;
        this.service.getScriptureById(this.id).subscribe({
          next: (data) => {
            console.log(data);
            if (data && data.sutra) {
              this.sutra = data.sutra.trim();
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

  goNavigate(id: number) {
    this.router.navigate(['Update'], { queryParams: { id } });
  }


  tabs = ['1 장', '2 장', '3 장', '4 장', '5 장'];

  increaseFontSize() {
    this.fontSize = 'text-3xl font-bold';
  }

}
