import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less']
})
export class MessengerComponent {
  public lastMessages: Array<string> = [];
  public allMessages: Array<string> = [];


  @Input()
  height: number = 400;
  @Input()
  width: number = 200;

  formMessenger: FormGroup;

  constructor(private hub: HubRealtimeService, private ref: ChangeDetectorRef, private _fb: FormBuilder) {

    this.formMessenger = this._fb.group({
      messageToSend: ["", [Validators.required]]
    });

    hub.suscribePublicMessage.subscribe((message) => {
      console.log(message)
      if (this.lastMessages.length < 10) {
        this.lastMessages.push(message);
        this.allMessages.push(message);
      } else {
        this.lastMessages.shift();
        this.lastMessages.push(message);
        this.allMessages.push(message);
      }
      this.ref.detectChanges();
    })
  }

  sendMessagePublic() {
    this.hub.postMessage(this.formMessenger.get('messageToSend').value);
    this.formMessenger.reset();
  }
}
