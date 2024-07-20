import { JsonPipe } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // 경전 삭제 다이얼로그를 띄운다.
  //   const temp = this.sutraDTO.title;
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: { id: this.sutraDTO.id, title: this.sutraDTO.title },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //   if (result === true) {
  //     this.sutraSubscription = this.service.deleteScripture(this.sutraDTO.id).subscribe({
  //       next: () => {
  //         this.openSnackBar(`경전 ( ${this.sutraDTO.id} ) 삭제완료 되었습니다.`, `[ ${temp} ] 삭제 완료되었습니다.!`);

  //         this.service.getScriptures().subscribe({
  //           next: (data: BuddistScripture[]) => {
  //             this.service.next(data);
  //           },
  //           error: (error: any) => {
  //             this.openSnackBar('경전 삭제 실패했습니다.', '경전 삭제 실패');
  //           }
  //         });
  //         this.router.navigate(['Buddha']);
  //       },
  //       error: (error: any) => {
  //         console.log(error);
  //         this.openSnackBar(`경전 ( ${this.sutraDTO.id} ) 삭제 실패 하였습니다.`, `[ ${temp} ] 삭제 실패!`);
  //       }
  //     });
  //   }
  // });
  // }

  // ngOnDestroy() {
  // }

  // delete () {
  //   console.log('delete');
  // }

  // cancel() {
  //   console.log('cancel');
  // }

}
