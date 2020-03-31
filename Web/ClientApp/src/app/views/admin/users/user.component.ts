import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { User } from '../../../../models/user';
import { BaseComponent } from '../../../../models/base-component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.less']
})

export class UserComponent extends BaseComponent implements OnInit {
  users: User[] = [];
  selectedUSer: User = new User();
  displayUser = false;
  showDeleteUser: boolean = false;
  userToDelete: number;
  textDelete: string;
  constructor(private userService: UserService) {
    super();
  }

  async ngOnInit() {
    await this.loadUser();
    this.selectedUSer = this.users[0];
  }

  async loadUser() {
    this.users = await this.userService.getAll();
  }

  selectUser(userId: number) {
    this.selectedUSer = this.users.find((user) => { return user.userId == userId });
  }

  toggleUser(userId: number = null) {
    if (userId) {
      this.selectUser(userId);
    }

    this.displayUser = !this.displayUser;
  }

  addUser() {
    this.selectedUSer = new User();
  }

  deleteUser(userId = null) {
    let userToDelete = userId || this.userToDelete;
    this.userService.delete(userToDelete).then(async () => {
      await this.loadUser();
    });
  }

  displayModal(user: User) {
    this.userToDelete = user.userId;
    this.textDelete = user.firstName + ' ' + user.lastName;
    this.showDeleteUser = !this.showDeleteUser;
  }

  validateDelete = () => {
    this.deleteUser();
  }
}
