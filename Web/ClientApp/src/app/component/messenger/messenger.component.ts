import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { MessageService } from '../../services/message.service';

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
  titleMessenger: string;
  constructor(private hub: HubRealtimeService, private ref: ChangeDetectorRef, private _fb: FormBuilder, private messageService: MessageService) {

    this.formMessenger = this._fb.group({
      messageToSend: ["", [Validators.required]]
    });

    let curentdate = new Date();
    let idUserAnonyme = `${curentdate.getHours()}${curentdate.getMinutes()}${curentdate.getSeconds()}${curentdate.getMilliseconds()}`;

    this.currentUserTag = `anonyme${idUserAnonyme}`;
    this.message.userName = `anonyme${idUserAnonyme}`;

    this.titleMessenger = this.currentUserTag;
    this.GetAllMessages();
    this.connectFlux();
  }

  async GetAllMessages() {
    this.lastMessages = await this.messageService.getAll();
  }

  sendMessagePublic() {
    this.message.text = this.formMessenger.get('messageToSend').value;
    this.message.time = new Date();

    if (this.formMessenger.valid && this.message.text.trim()) {
      this.hub.postMessage(this.message);
      this.formMessenger.reset();
    }
  }
  connectFlux() {
    this.hub.suscribePublicMessage.subscribe((message) => {
      //if (this.lastMessages.length < 10) {
        this.lastMessages.push(message);
      //} else {
      //  this.lastMessages.shift();
      //  this.lastMessages.push(message);
      //  this.allMessages.push(message);
      //}

      this.ref.detectChanges();
    });
  }
}
