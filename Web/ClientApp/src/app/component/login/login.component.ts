import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { MessageService } from '../../services/message.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  @Input()
  height: number = 38;

  formLogin: UntypedFormGroup;

  displayModal: boolean = false;
  user: User = new User();
  display401: boolean = false;

  constructor(private hub: HubRealtimeService, private userService: UserService, private _fb: UntypedFormBuilder, public router: Router) {
    if (UserService.currentUser.userId) {
      this.user = UserService.currentUser;
    }
    this.formLogin = this._fb.group({
      email: [this.user.email, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  toggle() {
    this.displayModal = !this.displayModal;
  }

  async onSubmit() {
    this.display401 = false;
    let email = this.formLogin.get('email').value;
    let password = this.formLogin.get('password').value;

    if (this.formLogin.valid) {
      await this.userService.getByEmailPassword(email, password).then((user) => {
        this.user = user.data;
        this.toggle();
      }).catch((err) => {
        this.display401 = err.status == 401;
      });
    }
  }

  async onDisconnect() {
    await this.userService.logout();
    this.reset();    
  }

  reset() {
    this.formLogin.reset();
    this.user = new User();
    this.toggle();
  }
}
