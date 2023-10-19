# bj.kimbumjun.co.kr

## Install Angular Materal

`ng add @angular/material`

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

    $ npm cache verify

    # (1) Install Angular Cli
    $ npm install -g @angular/cli

    # Basic Helper 
    $ ng --help
    $ ng new --help

    # (2) 워크스페이스, 기본 애플리케이션 생성하기 (Create)
    $ ng new my-first-project

    # (3) 애플리케이션 실행 (Run)
    $ ng serve -o
    $ ng serve --port 4201 # 중지 : Ctrl+C

    # (4) 배포 (Publish)
    $ ng build # 빌드 환경을 특별히 명시하지 않으면 `production` 환경이 기본
    $ ng build my-app -c production
```

---

## 컴포넌트 구성 3요소

1. 컴포넌트          : 데이터 관리 및 동작 처리
2. 템플릿           : 화면구성
3. 컴포넌트용 스타일  : 화면이 어떤 모습으로 표현될 지 지정

---

## Install `Angular CLI`

```bash

    # Install -> Angular CLI
    npm install -g @angular/cli
```

- Create new `Angular project` (ng)
  - 개발 환경에서 새로운  부모 폴더로 이동한 후
  - 아래의 명령줄 실행

```bash
    ng new my-first-project
    cd my-first-project
    ng serve -o  # 실행
```

- By `npm` Start

```bash
    npm init @angular myApp
    cd myApp
    npm start
```

---

## Install Angular Material

```bash
    $ ng add @angular/material
    # - Remove margins from body
    # - Set `height` : 100% on html and body
    # - Set `Roboto as the default application font`
    # - Add the `Roboto` font to `index.html`
    # - Add project dependencies to `package.json`
```

---

## Angular CRUD

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

---

## Mock Data Set up

### Install Json Server

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

- Resources
  - <http://localhost:3000/posts>
  - <http://localhost:3000/comments>
  - <http://localhost:3000/profile>
