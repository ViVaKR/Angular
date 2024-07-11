# BuddhamApp (Client)

## Target API Base URL : `https://localhost:7183`  (ASP.NET Core API, `BUDDHAM.API`)

```bash
npm i -g npm-check-updates
ncu -u
npm install


npm install office-addin-dev-certs

npx office-addin-dev-certs install --days 365
cp ~/.office-addin-dev-certs/localhost.* .
code .gitignore
ng serve --ssl --ssl-key localhost.key --ssl-cert localhost.crt --open
```

## Injectable

```bash
# 해당 클래스가 의조넝 주입 시스템에 활용된다는 것을 Angular 에게 알려주는 용도.
@Injectable({ providedIn: 'root'})

# 의존성 주입
# --> constructor() 인자로 의존성 책체의 타입을 지정하면됨.
```

## 데이터 공유

>- 부모와 자식 컴포넌트가 서로 데이터를 주고 받는 패턴 : @Input(), @Output()  데코레이터 로 구현.

>- @Input : Parent --> Child

- Child : `@Input item = '';`
- Parent : `<app-child [item]="currentItem"></app-child>`
- @Input() 변화 감지

>- 라이프 사이클 후킹 :  OnChagnes 함수 이용.

>- @Output : child -> Parent
