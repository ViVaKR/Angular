# Angular

> Angular is a front end framework build using the JavaScript by Google and `SPA`

- SPA : Single Page Application

## [Angular CLI](https://angular.io/cli)

- `Angular CLI` is a Command Line Interface that use to 
  - Develop
  - Create New App
  - Scaffold 
  - Maintain
  - Update
  - Compile

```bash
    $ npm cache verify

    # Install Angular Cli
    $ npm install -g @angular/cli

    # Basic workflow
    $ ng --help
    $ ng new --help

    # 워크스페이스, 기본 애플리케이션 생성하기
    $ ng new my-first-project

    # 애플리케이션 실행
    $ ng serve -o
    $ ng serve --port 4201 # 중지 : Ctrl+C

    # 배포
    $ ng build # 빌드 환경을 특별히 명시하지 않으면 `production` 환경이 기본
    $ ng build my-app -c production
```

- Command Overview
  - add
  - analytics

## 컴포넌트 구성 3요소

1. 컴포넌트 : 데이터 관리 및 동작 처리
2. HTML 템플릿 : 화면구성
3. 컴포넌트용 스타일 : 화면이 어떤 모습으로 표현될 지 지정


## Install `Angular CLI`

```bash
    # Installing Angular CLI
    npm install -g @angular/cli
```

- Create new `Angular project` (ng)
  - 개발 환경에서 새로운  부모 폴더로 이동한 후
  - 아래의 명령줄 실행

```bash
    ng new my-first-project
    cd my-first-project
    ng serve
```

- By `npm` Start 

```bash
    npm init @angular myApp
    cd myApp
    npm start
```

## Install Angular Material

```bash
    $ ng add @angular/material
    # - Remove margins from body
    # - Set `height` : 100% on html and body
    # - Set `Roboto as the default application font`
    # - Add the `Roboto` font to `index.html`
    # - Add project dependencies to `package.json`
```
