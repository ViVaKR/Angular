import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { PlaygroundComponent } from '@app/playground/playground.component';
import { HighlightDirective } from '@app/directives/highlight.directive';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Highlight,
    HighlightLineNumbers,
    HighlightAuto,
    PlaygroundComponent,
    HighlightDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  code = ` \

<div class="relative h-96 overflow-hidden bg-cover bg-center bg-ship bg-no-repeat p-12 text-center lg:h-screen">
  <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-teal-950/70 bg-fixed">
    <div class="flex h-full items-center justify-center">
      <div class="text-white">
        <main class="mb-4 text-9xl max-xl:text-7xl text-slate-300 cute-font-regular max-md:text-5xl font-extrabold">
          멀어지면 새로운 땅이 보인다.
        </main>
        <p class="mb-6 text-xs clear-both text-slate-400">...</p>
        <a class="border-slate-50 border-2 px-4  py-1 rounded-full text-slate-50 hover:border-sky-400 hover:text-sky-400"
           type="button"
           role="button"
           data-twe-ripple-init
           data-twe-ripple-color="light">Text {{ myPublicIp }}</a>
      </div>
    </div>
  </div>
</div>

`
  utilityService = inject(UtilityService);

  myPublicIp = '';

  fruits = Array.of("Banana", "Orange", "Apple", "Mango");

  newArr: any[] = [];
  newNumArr: any[] = [];
  flatArr: any[] = [];
  flatMapArr: any[] = [];
  temp: any[] = [];

  mulTen = (x: number) => x * 10;

  demos() {
    let list = this.fruits.keys();
    console.log(list);
    for (let key of list) {
      console.log(key, ":", this.fruits[key]);
    }

    const numbers = [4, 9, 16, 25];
    const numbers2 = [65, 44, 12, 4];
    const myArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let myArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.newArr = numbers.map(Math.sqrt);
    this.newNumArr = numbers2.map(this.mulTen);

    this.flatArr = myArr.flat();
    this.flatMapArr = myArr2.flatMap(x => x * 10);

    this.temp = myArr2.filter((x) => x > 3);

    let t1 = numbers.concat(numbers2, myArr2);
    console.log(t1);

    console.log(numbers.constructor);

    let sum = myArr2.reduce((acc, val) => acc + val, 0);

    console.log(sum);

    let result = numbers.some((x) => x > 10);
    console.log(result);

    let result2 = numbers.every((x) => x > 3);
    console.log("every : ", result2);

    let result3 = myArr2.reverse();
    console.log(result3);
    let rs1 = myArr2.values();
    myArr2.forEach(x => {
      console.log(x);
    });

    console.log(Date(), Date.now(), (new Date()).toLocaleString());

    const current = new Date();
    console.log(new Date());
    let t2 = current.getDay();
    console.log(current.getFullYear(), current.getMonth(),
      current.getDay(),
      current.getHours(),
      current.getMinutes(),
      current.getSeconds(),
      current.getMilliseconds());

    console.log(JSON.stringify({ x: 5, y: 6 }));

    console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));


    let session = {
      screens: [] as any[],
      state: true
    };

    session.screens.push({ name: 'screenA', width: 250, height: 180 });
    session.screens.push({ name: 'screenB', width: 390, height: 180 });
    session.screens.push({ name: 'screenC', width: 450, height: 250 });
    session.screens.push({ name: 'screenD', width: 640, height: 480 });
    session.screens.push({ name: 'screenE', width: 800, height: 600 });
    session.screens.push({ name: 'screenF', width: 1024, height: 768 });
    session.screens.push({ name: 'screenG', width: 1240, height: 650 });
    localStorage.setItem('session', JSON.stringify(session));
    var restoredSession = JSON.parse(localStorage.getItem('session') || '{}');
    console.log(restoredSession);
    let foo = {
      foundation: 'Mozilla',
      model: 'box',
      week: 45,
      transport: 'car',
      month: 7
    };

    let jsonString = JSON.stringify(foo, (key, value) => {
      if (typeof value === 'string') {
        return undefined;
      }
      return value;
    }, '\t');

    console.log(jsonString);

    let jonString2 = JSON.stringify(foo, ['model', 'transport']);

    console.log(jonString2);

    console.log(Reflect.ownKeys(foo));
  }

  demos2() {
    const duck = {
      name: "Maurice",
      color: "white",
      greeting: function () {
        console.log(`Quaaaack! My name is ${this.name}`);
      }
    }

    console.log(Reflect.has(duck, 'color'));
    Reflect.set(duck, "eyes", "skyblue");
    console.log(duck);

    Reflect.deleteProperty(duck, "eyes");
    console.log(duck);
    console.log(Reflect.get(duck, "color"));
  }

  demos3() {
    const prm = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done"); // fulfilled
        reject("error"); // rejected
      }, 3000)
    });

    prm.then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  myFunction(url: string) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  ngOnInit(): void {
    this.getMyPublicIp();
    this.demos3();
    let res = this.myFunction("https://localhost:50011/api/Account/users");
    res.then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }

  getMyPublicIp = () => {
    this.utilityService.getMyPublicIp().subscribe({
      next: (ip) => {
        this.myPublicIp = ip;
      },
      error: (err) => {
        this.myPublicIp = err.error.message;
      }
    });
  }
}

/*
map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

flatMap()
includes()

*/
