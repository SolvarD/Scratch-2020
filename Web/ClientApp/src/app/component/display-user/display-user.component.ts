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

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.less']
})
export class DisplayUserComponent extends BaseComponent implements OnInit {

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

    super();

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

    this.formUser = this._fb.group({
      email: [this.user.email, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      userName: [this.user.userName],
      roleId: [this.user.roleId, [Validators.required]],
      isActive: [this.user.isActive, [Validators.required]],
      languageId: [this.user.languageId, [Validators.required]]
    });



    //this.formUser = this._fb.group({
    //  email: [{ value: this.user.email, disabled: !this.canEdit }, [Validators.required]],
    //  firstName: [{ value: this.user.firstName, disabled: !this.canEdit }, [Validators.required]],
    //  lastName: [{ value: this.user.lastName, disabled: !this.canEdit }, [Validators.required]],
    //  userName: [{ value: this.user.userName, disabled: !this.canEdit }],
    //  roleId: [{ value: this.user.roleId, disabled: !this.canEdit }, [Validators.required]],
    //  isActive: [{ value: this.user.isActive, disabled: !this.canEdit }, [Validators.required]],
    //  languageId: [{ value: this.user.languageId, disabled: !this.canEdit }, [Validators.required]]
    //});
  }

}
