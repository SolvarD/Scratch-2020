import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less']
})
export class MessengerComponent {
  public lastMessages: Array<Message> = [];
  public allMessages: Array<Message> = [];


  @Input()
  height: number = 400;
  @Input()
  width: number = 320;

  formMessenger: FormGroup;
  message: Message = new Message();
  currentUserTag: string;

  //@ViewChild('scrollMe') private myScrollContainer: ElementRef;


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
    });
    let curentdate = new Date();
    let idUserAnonyme = `${curentdate.getHours()}${curentdate.getMinutes()}${curentdate.getSeconds()}${curentdate.getMilliseconds()}`;

    this.currentUserTag = `anonyme${idUserAnonyme}`;
    this.message.userName = `anonyme${idUserAnonyme}`;
  }

  sendMessagePublic() {
    this.message.text = this.formMessenger.get('messageToSend').value;
    this.message.time = new Date();
    this.hub.postMessage(this.message);
    this.formMessenger.reset();
  }
}
