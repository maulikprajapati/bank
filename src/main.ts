import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('Evaluation_License_Not_For_Production_Valid_Until1_March_2019__MTU1MTM5ODQwMDAwMA==571888b3c7cbc45a13d91e9c2e885c44');


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
