# KimbumjunApp

```bash

# Create new project
ng new kimbumjun-app

# styles.css --> add same selection themes
@import "@angular/material/prebuilt-themes/magenta-violet.css";


# Install Bootstrap
npm install bootstrap

# Install Angular Material
npm add @angular/material

#--> [ nstall Google Material-Web ]
npm install @material/web

# Instead Angular material, Using Google Material 3  Examples
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import the Material Web Component JavaScript module
import '@material/web/all.js';

@NgModule({
  declarations: [
    AppComponent
    // other components
  ],
  imports: [
    BrowserModule
    // other modules
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Allow custom elements
})
export class AppModule { }


# html
<mwc-card>
  <div class="mwc-card__content">Card Content</div>
</mwc-card>

#--> ( Install Tailwindcss )
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# styles.scss
@tailwind base;
@tailwind components;
@tailwind utilities;


#
npx find-duplicate-dependencies
npm dedupe
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
