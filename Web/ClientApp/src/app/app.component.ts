import { Component } from '@angular/core';
import { HubRealtimeService } from './services/hub-realtime';
import { weatherforecastService } from './services/weatherforecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(hub: HubRealtimeService, weatherforecast: weatherforecastService) {
    weatherforecast.init().then((res) => { console.log(res); });
    hub.Init();

    hub.suscribePublicMessage.subscribe(m => alert(m))
  }
}
