import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// // Extend the type, and declare the new function
// interface Date {
//   addDays(): Date;
// }

// // Add the implementation
// Date.prototype.addDays = function (days) {
//   var dat = new Date(this.valueOf())
//   dat.setDate(dat.getDate() + days);
//   return dat
// };
// var x = new Date();
// x.addDays();




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
