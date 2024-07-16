import { Component, inject, NgModule } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import localeKo from '@angular/common/locales/ko';
import { TextareaAutoresizeDirective } from '@app/common/textarea-autoresize.directive';

registerLocaleData(localeKo, 'ko');

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgIf,
    NgFor,
    CurrencyPipe,
    AllMatModule,
    TextareaAutoresizeDirective
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})

export class DashBoardComponent {

  title = "오늘의 경전";

  private breakpointObserver = inject(BreakpointObserver);
  today = new Date();
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '경전 1', cols: 1, rows: 1 },
          { title: '경전 2', cols: 1, rows: 1 },
          { title: '경전 3', cols: 1, rows: 1 },
          { title: '경전 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: '경전 1', cols: 2, rows: 1 },
        { title: '경전 2', cols: 1, rows: 1 },
        { title: '경전 3', cols: 1, rows: 2 },
        { title: '경전 4', cols: 1, rows: 1 }
      ];
    })
  );
  userInput = `\

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae sit, corporis accusantium consequatur necessitatibus facere minus. Culpa porro eos hic, dolore aliquid distinctio nostrum. Totam perspiciatis perferendis similique suscipit facilis?
Mollitia repellat cupiditate nostrum, omnis architecto molestias tempore qui voluptas recusandae quam at dolores voluptate, ex quo temporibus delectus saepe, esse consequuntur ab iste fugit quis dolorem laborum. Cupiditate, quas!
Harum repellendus, maxime facilis iste odio sit voluptatibus voluptatem illo sed cumque eveniet perspiciatis quae! Eligendi veniam illo sint praesentium architecto fuga! Molestias, natus! Eaque facere at facilis dicta asperiores!
Distinctio hic, vel veniam quos sequi architecto. Quaerat, reiciendis libero. Sequi beatae expedita quaerat voluptate incidunt veniam doloribus repellendus. Velit quia, tempora neque error et eveniet ad magni impedit doloremque.
Suscipit quaerat numquam unde cum neque corrupti id facere qui! Iste explicabo ex, soluta natus id atque exercitationem, perferendis ad ratione beatae tempore reiciendis sapiente nobis, facere alias eum provident!
Amet saepe voluptatum rem nobis porro nulla fugit placeat consectetur nam labore suscipit architecto voluptatem molestiae eligendi ea quasi iure, aliquid quod dolor explicabo similique at quia. Sint, voluptate reprehenderit?
Quibusdam, rerum! Fuga nisi impedit maxime incidunt dignissimos, soluta ex expedita harum est beatae dolores minima dicta a! Commodi fugiat dolorem molestiae vero explicabo eius deserunt magni! Impedit, vero repudiandae.
Possimus laborum, eius quasi ullam dolor nulla quibusdam laudantium perspiciatis magni corrupti officia nihil eligendi illo quae, soluta quia deleniti neque reprehenderit a ducimus? Quibusdam reprehenderit in ipsa? Nesciunt, debitis.
Maxime sunt possimus labore provident tempore distinctio odit, accusamus praesentium cum voluptatem quas quos, blanditiis id esse iste perspiciatis facere enim ad dignissimos exercitationem consectetur porro expedita alias laboriosam. Ipsam.
Sapiente eum ullam repudiandae quia vel, odit ex? Minima inventore labore temporibus sit quidem fugiat quasi reprehenderit recusandae, accusantium tempore nemo debitis deserunt facilis cumque quod voluptate nulla! Corrupti, nulla!
Quidem facilis aperiam pariatur quam modi harum illum aliquid delectus. Cupiditate vel veritatis in quos ullam pariatur quo dignissimos exercitationem ea impedit accusantium dicta iusto natus, et ipsam voluptate quasi?
Quaerat minima, natus, itaque culpa delectus id repellendus accusantium magnam atque fugiat ut rem ratione commodi velit officiis! Deserunt fugit tempora aliquid deleniti? Eum, nulla illum! Dolor tempora cumque itaque.
Cum voluptatibus architecto officiis ipsum maiores reiciendis, magni ullam, voluptas corrupti consequatur culpa voluptatum ex autem obcaecati! Quo quas dolorem omnis assumenda, impedit vitae ullam id, ipsum, exercitationem blanditiis accusamus?
Assumenda vitae fugiat distinctio repudiandae expedita voluptas ut, at, harum ullam nostrum incidunt delectus tenetur, aut earum cumque fugit sint accusantium. Quam ex debitis est incidunt minima totam exercitationem dicta.
Enim deleniti sint fuga non vel impedit, quas unde modi animi obcaecati amet. Obcaecati possimus ad autem recusandae eius necessitatibus, et, facilis magnam perspiciatis iste hic reprehenderit ex atque? Illum.
Cumque ipsam corrupti veniam sequi distinctio animi alias impedit nihil porro inventore iure ullam a reprehenderit, tempora reiciendis, dolores cum quidem obcaecati labore, sit dignissimos assumenda veritatis et ut? Deserunt.
Autem minima perferendis cumque, consectetur at modi exercitationem neque quas ut esse rem officiis illum eius nobis est earum, excepturi expedita? Sunt cupiditate praesentium, voluptates blanditiis labore quam nostrum qui!
Distinctio, eligendi deserunt neque repellat ea excepturi ducimus dolorum debitis soluta dolores, laudantium libero! Explicabo quod, nemo odit, perspiciatis amet ex in laboriosam sint excepturi ab iusto repudiandae, praesentium consequatur?
Molestiae, aspernatur fuga amet beatae sapiente in voluptas corporis maxime et perferendis, aliquam necessitatibus rerum recusandae, vel tempore minus quas quibusdam. Illum, sint expedita omnis eligendi quo asperiores dolore voluptatem!
Sunt, laudantium possimus nulla, architecto delectus culpa vero tempore, officiis tempora maxime optio voluptatibus enim? Delectus quidem error, necessitatibus enim fugit suscipit, molestiae voluptates qui, nemo quia ipsam veritatis consequuntur?
`;
}
