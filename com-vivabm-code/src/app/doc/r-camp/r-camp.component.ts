import { AfterViewInit, Component, inject } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";
import { CodeService } from '@app/services/code.service';
import { ICode } from '@app/interfaces/i-code';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-r-camp',
  standalone: true,
  imports: [
    PreparingComponent,
    JsonPipe
  ],
  templateUrl: './r-camp.component.html',
  styleUrl: './r-camp.component.scss'
})
export class RCampComponent implements AfterViewInit {
  title: any = 'R Camp';
  message: any = 'R 훈련소 준비중';

  codeService = inject(CodeService);

  data: ICode = {} as ICode;

  ngAfterViewInit(): void {

    this.codeService.getCodeById(58).subscribe({
      next: data => {

        this.data = {
          id: data.id,
          title: data.title,
          subTitle: data.subTitle,
          content: data.content,
          subContent: data.subContent,
          markdown: data.markdown,
          created: data.created,
          modified: data.modified,
          note: data.note,
          categoryId: data.categoryId,
          userId: data.userId,
          userName: data.userName,
          myIp: data.myIp,
          attachFileName: data.attachFileName,
          attachImageName: data.attachImageName
        }


      },
      error: error => {
        console.error(error.message);
      }
    });
  }

}
