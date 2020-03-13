import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.less']
})
export class MultiLanguageComponent {

  @Input()
  height: number = 50;
  @Input()
  width: number = 50;

  formMessenger: FormGroup;
  constructor(private _fb: FormBuilder) {

    this.formMessenger = this._fb.group({
      messageToSend: ["", [Validators.required]]
    });
  }
}
