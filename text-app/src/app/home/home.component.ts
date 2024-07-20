import { Component, inject, model, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ACampComponent } from '@app/camp/a-camp/a-camp.component';
import { BCampComponent } from '@app/camp/b-camp/b-camp.component';
import { CCampComponent } from '@app/camp/c-camp/c-camp.component';
import { CampService } from '@app/services/camp.service';
import { } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/common/dialog/dialog.component';
import { DialogData } from '@app/interfaces/dialog-data';
import { JsonPipe } from '@angular/common';
import { BottomSheetComponent } from '@app/common/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AllMatModule,
    MatIcon,
    ACampComponent,
    BCampComponent,
    CCampComponent,
    MatSidenavModule,
    MatSidenavContainer,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authServices = inject(AuthService);
  readonly dialog = inject(MatDialog);

  bottomSheet = inject(MatBottomSheet);

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }


  constructor(private campService: CampService, private route: Router) { }

  onSubject() {
    this.campService.next(Math.random());
  }

  goNavigate(url: string) {
    this.route.navigate([url]);
  }

  readonly title = signal('title');
  readonly content = model('contents')

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '480px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: { title: this.title(), content: this.content() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.content.set(result);
      }
    });
  }
}
