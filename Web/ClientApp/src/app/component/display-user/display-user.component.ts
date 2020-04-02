import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef, OnInit, Output } from '@angular/core';
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
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.less']
})
export class DisplayUserComponent extends BaseComponent implements OnInit {

  formUser: FormGroup;
  private _user: User = new User();
  languages: Language[] = [];
  roles: Role[] = [];
  originalUser: User = new User();
  hasChange: boolean = false;

  @Input()
  get user() {
    return this._user;
  }
  set user(val) {
    this._user = val
    this.originalUser = Object.assign({}, val);
    this.buildForm(val);
  }

  @Output()
  close: Subject<boolean> = new Subject<boolean>();

  constructor(private _languageService: LanguageService, private userService: UserService,
    private _fb: FormBuilder, private _roleService: RoleService) {
    super();
  }

  async onSubmit() {
    console.log(this.formUser);
    if (this.formUser.valid && this.hasChange) {
      let saveUser = this.formUser.value as User;
      saveUser.roleId = parseInt(this.formUser.value.roleId);
      saveUser.languageId = parseInt(this.formUser.value.languageId);

      if (this.user.userId) {
        await this.userService.update(saveUser).then((user) => {

        });
      } else {
        await this.userService.create(saveUser).then((user) => {

        });
      }
    }
  }

  async ngOnInit() {
    this.languages = await this._languageService.getAll();
    this.roles = await this._roleService.getAll();
    UserService.subCurrentUser.subscribe(() => {
      for (var key in this.formUser.controls) {
        if (this.canEdit) {
          this.formUser.controls[key].enable();
        } else {
          this.formUser.controls[key].disable();
        }
      }
    });
  }

  reset() {
    this.user = Object.assign({}, this.originalUser);
  }

  buildForm(user: User) {
    this.formUser = this._fb.group({
      email: [{ value: user.email, disabled: !this.canEdit }, [Validators.required]],
      firstName: [{ value: user.firstName, disabled: !this.canEdit }, [Validators.required]],
      lastName: [{ value: user.lastName, disabled: !this.canEdit }, [Validators.required]],
      userName: [{ value: user.userName, disabled: !this.canEdit }],
      roleId: [{ value: user.roleId, disabled: !this.canEdit }, [Validators.required]],
      isActive: [{ value: user.isActive, disabled: !this.canEdit }, [Validators.required]],
      languageId: [{ value: user.languageId, disabled: !this.canEdit }, [Validators.required]],
      userId: [user.userId],
      password: [user.userId ? user.password : '']
    });

    this.formUser.valueChanges.subscribe(() => {
      this.hasChange = true;
    })
  }

  async deleteUser(userId) {
    await this.userService.delete(userId);
  }

  onClose() {
    this.close.next(true);
  }
}
