import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    const loader = document.getElementById('app-loader')
    if (loader) {
      setTimeout(() => loader.remove(), 1_000);
    }
  })
  .catch((err) => console.error(err));
