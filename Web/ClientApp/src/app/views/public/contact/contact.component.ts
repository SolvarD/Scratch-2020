import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { ContactMessage } from '../../../../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  formContact: UntypedFormGroup;
  hasChange: boolean = false;
  messageSend: boolean = false;
  messageError: boolean = false;
  messageSending: boolean = false;

  constructor(private _fb: UntypedFormBuilder, private contactService: ContactService) {

  }
  ngOnInit(): void {
    this.formContact = this._fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.formContact.valueChanges.subscribe(() => {
      this.hasChange = true;
    })
  }
  onSubmit() {    
    this.messageSend = false;
    this.messageError = false;
    if (this.formContact.valid) {
      this.messageSending = true;
      this.contactService.Send(this.formContact.value as ContactMessage).then(() => {
        this.messageSend = true;
      }).catch(() => {
        this.messageError = true;
      }).finally(() => {
        this.messageSending = false;
      });
    }
  }
}
