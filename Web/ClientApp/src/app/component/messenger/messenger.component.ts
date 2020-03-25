import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { MessageService } from '../../services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less'],
  animations: [trigger('sizeChat', [
    state('open', style({
      flex: '1'
    })),
    state('closed', style({
      display: 'none'
    })),
    state('justHeader', style({
      height: '50px'
    })),
    state('hideMessage', style({
      height: '0px'
    })),
    state('hideInput', style({
      display: 'none'
    })),
    transition('open <=> *', [
      animate('0s')
    ]),
    transition('open <=> hideInput', [
      animate('0s')
    ])
  ])]
})
export class MessengerComponent {
  public lastMessages: Array<Message> = [];
  public allMessages: Array<Message> = [];


  @Input()
  height: number = 400;
  @Input()
  width: number = 320;

  private origineSize = this.height;
  formMessenger: FormGroup;
  message: Message = new Message();
  currentUserTag: string = UserService.currentUser.userName;
  titleMessenger: string = UserService.currentUser.userName;
  isOpen: boolean = false;
  countUsers = 0;
  newMessage: boolean = false;

  constructor(private hub: HubRealtimeService, private ref: ChangeDetectorRef, private _fb: FormBuilder, private messageService: MessageService, private titleService: Title) {

    this.formMessenger = this._fb.group({
      messageToSend: ["", [Validators.required]]
    });

    this.message.userName = UserService.currentUser.userName;

    UserService.subCurrentUser.subscribe((user) => {
      this.currentUserTag = user.userName;
      this.message.userName = user.userName;
      this.titleMessenger = user.userName;
    });

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
      if (message.userName != this.currentUserTag) {
        this.newMessage = true;
        this.titleService.setTitle('New Message');
      }
      this.lastMessages.push(message);
      this.ref.detectChanges();
    });

    this.hub.suscribeCountUser.subscribe((total) => {
      this.countUsers = total;
      this.ref.detectChanges();
    });
  }

  toggle() {
    this.newMessage = false;
    this.isOpen = !this.isOpen;
  }
  getClassIco() {
    return this.isOpen ? 'fas fa-angle-down' : 'fas fa-angle-up';
  }

  disableBlink() {
    this.newMessage = false;
    this.titleService.setTitle('GlobalDevApp');
  }
}
