import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { MessageService } from '../../services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { Language } from '../../../models/language';
import { LanguageService } from '../../services/language.service';
import { Role } from '../../../models/role';
import { RoleService } from '../../services/role.service';
import { BaseComponent } from '../../../models/base-component';
import { parse } from 'querystring';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.less'],
    standalone: false
})
export class ModalConfirmComponent implements OnInit {

  
  _displayModalConfirm: boolean = false;

  @Input()
  set displayModalConfirm(val) {   
    this._displayModalConfirm = !this._displayModalConfirm;
  }
  get displayModalConfirm() {
    return this._displayModalConfirm;
  }


  @Input()
  onValidate: Function;
  @Input()
  valueToDelete: string;

  constructor() {
    this.displayModalConfirm = false;
  }

 

  async ngOnInit() {
    
  }

  reset() {
    
  }

  toggle() {
    this.displayModalConfirm = false;
  }

  confirmDelete() {
    this.onValidate();
    this.displayModalConfirm = false
  }
}
