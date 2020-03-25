import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.less']
})

export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUSer: User = new User();

  constructor(private _users: UserService) { }  

  async ngOnInit() {
    this.users = await this._users.getAll();
    this.selectedUSer = this.users[0];
  }
}
