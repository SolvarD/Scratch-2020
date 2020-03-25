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

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.less']
})
export class DisplayUserComponent implements OnInit {

  formUser: FormGroup;
  private _user: User = new User();
  languages: Language[] = [];
  roles: Role[] = [];

  @Input()
  get user() {
    return this._user;
  }
  set user(val) {
    this._user = val
  }
  constructor(private _languageService: LanguageService, private userService: UserService,
    private _fb: FormBuilder, private _roleService: RoleService) {
    //this.user = new User();

    this.formUser = this._fb.group({
      email: [this.user.email, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      userName: [this.user.userName],
      roleId: [this.user.roleId, [Validators.required]],
      isActive: [this.user.isActive, [Validators.required]],
      languageId: [this.user.languageId, [Validators.required]]
    });

  }

  async onSubmit() {
    if (this.formUser.valid) {
      console.log('formUser', this.formUser.value);
      //await this.userService.Update(this.formUser.value as User).then((user) => {

      //});
    }
  }

  async ngOnInit() {
    this.languages = await this._languageService.getAll();
    this.roles = await this._roleService.getAll();
  }

}
