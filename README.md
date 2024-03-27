# Angular

>- Complete Framework - End to End Development Batteries included.
>- 완전한 프레임워크 - 엔드 투 엔드 개발 도구들이 포함되어 있습니다.

## Angular 17 Lanunched (2024.3.7)

1. New Log
2. New website:  [https://angular.dev](https://angular.dev)
3. New Website + Documentation + Examples + Playground
4. Template Control features
   1. @if
   2. @for
   3. @switch
5. @Defer loading
6. Faster performance with Material UI
7. Super easy Input trasforms

## 주요 특징

1. Angular framework is developed and maintained by Google
2. Angular 17은 웹 개발을 위해 널리 사용되는 TypeScript 기반 프레임워크의 최신 버전입니다.
3. Angular 17의 주요 기능 중 하나는 선언적 제어 흐름과 지연 가능한 뷰라는 두 가지 주요 측면으로 구성된 새로운 로딩 시스템입니다.
4. Angular 17은 TypeScript를 계속 활용하여 강력한 타이핑을 통해 고급 도구 및 개발자 경험을 제공합니다.
5. 더 나은 성능, 더 작은 번들 크기 및 더 빠른 컴파일을 위해 lvy 렌더링 엔진이 더욱 향상되었습니다.
6. 최상의 실천을 장려하기 위해 Angular 17은 유지 관리 가능성을 높이기 위해 새 프로젝트에서 기본적으로 엄격 모드를 활성화할 수 있습니다.
7. 잠재적으로 새로운 테스트 API와 더 나은 디버깅 도구를 포함하여 향상된 테스트 기능.
8. 효율적인 애플리케이션 구조를 위해 재사용 가능한 구성 요소와 지연 로딩을 촉진하는 Angular 모듈식 아키텍처를 계속 유지합니다.
9. 최신 RxJS 라이브러리와 통합되어 보다 강력하고 효율적인 반응형 프로그래밍을 제공합니다.

## Includes

1. modular Approach
2. Component Based Architecture.
3. Directives.
4. Routing.
5. Services.
6. Pipes.
7. Templates.
8. Data Binding.
9. Interpolation.
10. Angular CLI.
11. Forms Integration.
12. [RxJS](https://rxjs.dev/guide/overview) Integration.
    - RxJS는 관찰 가능한 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 구성하기 위한 라이브러리입니다.
    - 하나의 핵심 유형인 Observable , 위성 유형(Observer, Schedulers, Subjects) 및
    - Array메서드( map, filter, reduce, every등)에서 영감을 받은 연산자를 제공하여 비동기 이벤트를 컬렉션으로 처리할 수 있습니다.
13. Animations.
14. Signals
15. Server Side Rendering
16. HTTP and much more.

## 포함된 기능들

1. 모듈식 접근 방식
2. 구성 요소 기반 아키텍처.
3. 지침.
4. 라우팅.
5. 서비스.
6. 파이프.
7. 템플릿.
8. 데이터 바인딩.
9. 보간.
10. 각도 CLI.
11. 양식 통합.
12. RxJS 통합.
13. 애니메이션.
14. 신호
15. 서버사이드 렌더링
16. HTTP

>- example

```js
  @if(loggedIn) {
    The user is logged in
  } @else {
    The user is not logged in
  }

  @switch (accessLevel) {
    @case ('admin') { <admin-dashboard /> }
    @case ('moderator') { <moderator-dashboard/> }
    @defautl { <user-dashboard/> }

    @for (user of users; track user.id) {
      {{ user.name }}
    } @empty {
      Empty list of users
    }
```

## [Upgrade](https://update.angular.io)

```bash

# cli
$ ng update @angular/core@17 @angular/cli@17

```

## node lts install (nvm, macos)

```bash
# used nvm (brew install nvm)

$ nvm --help
$ nvm cache clear
$ nvm install -lts
$ nvm use --lts
$ nvm ls
$ nmv uninstall <old version>

```

---

## Installation

> Angular is a front end framework build using the JavaScript by Google and `SPA`[^1]

[^1]: SPA : Single Page Application

## [Angular CLI](https://angular.io/cli)

- `Angular CLI` is a Command Line Interface that use to
    - Develop
    - Create New App
    - Scaffold
    - Maintain
    - Update
    - Compile

## Install CLI & Create New Application & Run & Publish

```bash

    # Editor IDE : Visual Studio Code
    $ node -v
    $ npm -v
    $ npm cache verify

    # (1) Install Angular Cli
    $ npm install -g @angular/cli

    # Basic Helper
    $ ng --help
    $ ng version
    $ ng new --help

    # (2) 워크스페이스, 기본 애플리케이션 생성하기 (Create)
    $ ng new my-first-project

    #-> scss, server side = no

    # (3) 애플리케이션 실행 (Run)
    $ ng serve -o
    $ ng serve --port 4201 # 중지 : Ctrl+C

    # (4) Install Angular Material
    #-> material.angular.io
    #-> Material Design components for Anglar
    $ ng add @angular/material
    #-> theme -> typography -> animations (mouse hovering effect...)


    # (4) 배포 (Publish)
    $ ng build # 빌드 환경을 특별히 명시하지 않으면 `production` 환경이 기본
    $ ng build my-app -c production

    # V.17 : Default Standalone

    # create app.module.ts
    $ ng new myNewApp --no-standalone
```

---

## 컴포넌트 구성 3요소

1. 컴포넌트          : 데이터 관리 및 동작 처리
2. 템플릿           : 화면구성
3. 컴포넌트용 스타일  : 화면이 어떤 모습으로 표현될 지 지정

---

>- Install `Angular CLI`

```bash

    # Install -> Angular CLI
    npm install -g @angular/cli
```

>- Create new `Angular project` (ng)

```bash
    ng new my-first-project
    cd my-first-project
    ng serve -o  # 실행
```

>- By `npm` Start

```bash
    npm init @angular myApp
    cd myApp
    npm start
```

>- Install Angular Material & Bootstrap

```bash
    $ ng add @angular/material
    # - Remove margins from body
    # - Set `height` : 100% on html and body
    # - Set `Roboto as the default application font`
    # - Add the `Roboto` font to `index.html`
    # - Add project dependencies to `package.json`

    $ npm install bootstrap bootstrap-icons

```

>- angular.json -> archect -> build

```json

    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/bootstrap-icons/font/bootstrap-icons.scss",
      "src/styles.scss"
    ],
    "scripts": [
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]

```

>- Folder Structure & Files

1. Parent folder will be the main project folder
2. `.angular` : Ignore this folder
3. `.vscode` : Ignore this folder
4. `node_modules`
   - You dont have to go through these folders or files
   - Packages will be installed here in this folder
   - Unless you are making chages to core libraries/modules
   - npm install or ng add -> you would see the package the here
5. `.editorconfig` : Make your custom editor changes in this file
6. `.gitignore`
   - We can add folders/files that we need to ignore while commiting
   - node_modules
7. `angular.json`
   - Confuguraing your styles, js or for pipline deployments
   - settings specific to your project
   -
8. `package.json`
   - the installed dependencies of the project
   - when we run npm install inside project, the modules listed will be installed
9. `package-lock.json`
    - same details of package.json + dev dependencies broken down in details.
    - Dont touch this manually.
10. `tsconfig.app.json`
    - tells you the typescript configuration for your project
    - dont touch it - for dev purpose
11. `tsconfig.spec.json`
    - typescript test specific confguration
12. `READEME.md` : Startin file, documentation of your project
13. `SRC` : this is source code of project
    - `app`
      - this is your actual code of your project/application
      - Every component in Angular -> has 4 files
        1. .html - template, HTML
        2. .scss/.css/.less - styles
        3. .spec.ts - unit test file :::test command -> ~/src/app/ -> $ ng test
            - app.component.spec.ts
              - Unit testing (단위 테스트)
              - Jasmine - writeing the unit tests, 단위 테스트를 작성할 위치를 기록
              - Karma - test runner, 테스트 실행자
        4. .ts - component class / logical piece of component
            - app.component.ts
              - selector -> app-root
              - standalone
              - imports
              - templateUrl
              - styleUrl

    - `assets` -> Use this folder to serve the assets which are public
    - `favicon` -> in the brower icon
    - `index.html` -> Angular is a SPA , theree is only 1 html file
      - When we develop, build the app -> the index.html
      - `<app-root>`
        - starting point of the project
        - First component to be initialized
    - `main.js`
      - Starting point.
      - Entry point to your project
      - which is the frist component to be rendered in your project
    - `styles.scss`
      - .css/ .less / .scss -> extensions of css
      - Global styling for your project

## Angular CLI (Command Line Interface)

>- Project Creation, Configuration, Development, Testing and Deployment.

1. Project Initialization: Quickly generaties a new Angular project with essential comfiguration and file
2. Code Generation: components, service, modules and more
3. Build and Serve: Build the application for development or production and serve it locally
4. Testing Tools: Intergates testing frameworks and tools for unit and end-to-end testing

>- Common Commands and Syntax

1. Creating a New Project
   - `ng new projct-name` - Initializes a new Angular project.

2. Generating Commponents, Services, etc.
   - `ng generate component component-name` - Generates a new component
   - `ng g service service-name` - Cretes a new service.
   - `ng g module module-name` - Generates a new module
   - component, module, service, pipe, directive, routing, interface, model, class ...

3. Building the Application
   - `ng build` - Compiles the application into an output directory.

4. Running the Development Server
   - `ng serve` - Starts a dev server and serves the appplication on a local host.

5. Test
   - `ng test` : Executes the unit tests via Karma. Used for running the unit tests (.spec.ts)
   - `ng e2e` : Runs end-to-end tests using Protractor.

6. Launch
   - `ng serve` : build and launch app locally

7. Build
   - `ng build` : when its production ready --> `dist` folder -> files (inde.html, styles.css, ployfills.js, main.js)
   - make changes to settings in angular.json -> (architect / build / outputPath)

8. Linting the Project
   - `ng lint` : Run linting tools on Angular code.
   - `npm i eslint@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest --save`
   - Linting making sure making TypeScript is proper
   - coding syntax
   - patterns etc

9. Adding Libraries
    - `ng add library-name` : Adds a library to the project
    - ng add for adding packages and modules of Angular

10. Updating Angular
    - `ng update` : Updates Angular and its dependencies
    - Update any angular application to other version using ng update

```bash
ng generate component header #-> src/app/header
ng generate module layout
```

## Components in Angular

1. Angular components are decalred using @component decorator
2. @component decorator can have multiples imputs/parameters
   - selector -> its the name which can be used/refered in application
   - standalone -> by default all angular applications are stanalone
     - Use them anywhere in the applications
     - No need to inject in a module
   - No need to declare inside a Module
   - You can directly use them in the applications
   - import -> You will provide all required modules for this component
   - templateUrl -> HTML for the component
   - template -> Use when you hamve only limited HTML
   - styleUrl -> The CSS or stylesheet for the component
   - style -> define inline style

3. Components communicate with each other using `@Input` and `@Output` decorators for data sharing and event handling
   - @Input : Used for sending data to the component
   - @Output : Sending data from the component
4. Angular provides lifecycle hooks like `ngOnInit`, `ngOnDestroy` allowing components to run code at specific lifecycle events.
   - Right from creation -> [8 stages] -> destory
   -
5. Components can inject servcies as dependencies to share data and functionality across the application.
6. Components can incorporate directives, enhancing therir functionality an behavior.
7. View encapsulation in components controls how CSS styles are applied and scoped.
8. Component Structure:
   - <componentName>.component.html -> Template/HTML/ UI
   - <componentName>.component.css/scss -> Stylesheet for the component
   - <componentName>.component.spec.ts -> Unit tests for the component
   - <componentName>.component.ts -> Class for the component/ logic /data/interactions

9. Data Binding
    - Class (ts) <--> Template (HTML)

## Modular Architecture

1. NgModule
   - The fundamental building block of an Angular applicatin is the NgModule, which encapsultes components, directives, pipes, and servics
   - Angular 애플리케이션의 기본 구성 요소는 NgModule이며, 이는 구성 요소, 지시문, 파이프 및 서비스를 캡슐화합니다.

2. AppModul
   - Every Angular application used to have at least one module, the root module, typically named 'AppModule', which bootstraps the application.
   - 모든 Angular 애플리케이션에는 일반적으로 애플리케이션을 부트스트랩하는 'AppModule'이라는 루트 모듈인 적어도 하나의 모듈이 있었습니다.
     - bootstrap (booting) : 부트스트랩(Bootstrap)이란, 일반적으로 한 번 시작되면 알아서 진행되는 일련의 과정을 뜻한다.## Angular CRUD

>- Angular 17 - Module Architecure
- No more NgModule
- No more default AppModule
- Everythingis standalone -> it can be inijected and used anywhere
    - if disable -> Adding to schematics and disable `standalone = false` in Angular.json
- main.ts -> Bootstrap AppComponent
- Lazy Loading
- Shared Modules
- Core Module
- Feature Modules
- Module Imports
- Service Scoping
- Declarables
- Exporting Module Content
- NgModule Provides
- Angular Libraries
- Hierarchical Dependency Injection
- Module Federation (Micro-Frontends)

## AppRouting Module

- You will NOT see AppRoutingModule file
- `app.routes.ts` -> `AppRoutes`
- `app.routes.ts` -> `app.config.ts`
- `AppConfig` -> `main.ts`

```bash

# can use RoutingModule in Angular 17?
# Angular 17 is backwards compatible
ng g module <module name> --routing
ng g module timetable --routing

````

- `C`reate
    - HTTP `POST` Method
    - Create New Resource via API
- `R`ead
    - HTTP `GET` Method
    - Retrieve existing data from API
- `U`pdate
    - HTTP `PUT` Method
    - Update existing data from API
- `D`elete
    - HTTP `DELETE` Method
    - Delete an existing resource via API

## Install Json Server

==`$ npm install -g json-server`==

- Json Server Runs in `3000`

- [Json-Server dummy json](https://github.com/typicode/json-server)

- db.json data file locate $\rightarrow$ `assets/data/db.json`

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

- navigate to the data folder : `src/assets/data/`
- Run $\rightarrow$ `$ json-server --watch ./db.json`

---

## Create New Angular 17 Project

```bash
# install node by nvm
$ nvm list
$ nvm use --lts

$ npm install -g @angular/cli
$
```

---
