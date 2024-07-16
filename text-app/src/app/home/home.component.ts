import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ACampComponent } from '@app/camp/a-camp/a-camp.component';
import { BCampComponent } from '@app/camp/b-camp/b-camp.component';
import { CCampComponent } from '@app/camp/c-camp/c-camp.component';
import { CampService } from '@app/services/camp.service';
import { } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AllMatModule,
    MatIcon,
    ACampComponent,
    BCampComponent,
    CCampComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



  constructor(private campService: CampService, private route: Router) { }

  onSubject() {
    this.campService.next(Math.random());
  }

  goNavigate(url: string) {
    this.route.navigate([url]);
  }

}
