import { Component } from '@angular/core';
import { HubRealtimeService } from './services/hub-realtime';
import { WeatherforecastService } from './services/weatherforecast.service';
import { UserService } from './services/user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  constructor(hub: HubRealtimeService, private _translateService: TranslateService) {
    this._translateService.use(UserService.currentUser.languageId.toString());
    hub.Init();

    Array.prototype['groupBy'] = (list, keyGetter) => {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    };
  }
}
