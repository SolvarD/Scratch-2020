import { Component } from '@angular/core';
import { HubRealtimeService } from './services/hub-realtime';
import { WeatherforecastService } from './services/weatherforecast.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(hub: HubRealtimeService, weatherforecast: WeatherforecastService, userService: UserService) {    
    hub.Init();

    weatherforecast.init().then((res) => { console.log(res); });
    userService.getAll().then((res) => { console.log('USERS', res); });
  }
}
