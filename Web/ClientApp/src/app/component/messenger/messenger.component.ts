import { Component } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html'
})
export class MessengerComponent {
  public lastMessages: Array<string> = []

  constructor(hub: HubRealtimeService) {
    hub.suscribePublicMessage.subscribe((message) => {
      if (this.lastMessages.length <= 10) {
        this.lastMessages.push(message);
      } else {

      }
        
    })
  }
}
