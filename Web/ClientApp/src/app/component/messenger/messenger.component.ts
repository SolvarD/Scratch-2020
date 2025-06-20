import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { MessageService } from '../../services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
  ])],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MessengerComponent {
  public lastMessages: Array<Message> = [];
  public allMessages: Array<Message> = [];


  @Input()
  height: number = 400;
  @Input()
  width: number = 320;

  private origineSize = this.height;
  formMessenger: UntypedFormGroup;
  message: Message = new Message();
  currentUserTag: string = UserService.currentUser.userName;
  titleMessenger: string = UserService.currentUser.userName;
  isOpen: boolean = false;
  countUsers = 0;
  newMessage: boolean = false;
  stopBlink: NodeJS.Timeout;

  constructor(private hub: HubRealtimeService, private ref: ChangeDetectorRef, private _fb: UntypedFormBuilder, private messageService: MessageService, private titleService: Title) {

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
    this.lastMessages = (await this.messageService.getAll()).data;
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
        this.triggerNewMessage();
      }
      this.lastMessages.push(message);
      this.ref.detectChanges();
    });

    this.hub.suscribeCountUser.subscribe((total) => {
      this.countUsers = total;
      this.ref.detectChanges();
    });
  }

  triggerNewMessage() {
    this.newMessage = true;
    this.stopBlink = setInterval(() => {
      if (this.titleService.getTitle() == 'GlobalDevApp') {
        this.titleService.setTitle('New Message');
      } else {
        this.titleService.setTitle('GlobalDevApp');
      }
    }, 1000);
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
    clearInterval(this.stopBlink);
    this.titleService.setTitle('GlobalDevApp');
  }
}
