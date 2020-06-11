import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { User } from '../../../../models/user';
import { BaseComponent } from '../../../../models/base-component';
import { Subject } from 'rxjs';
import { InfoPagination } from '../../../../models/info-pagination';

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
  skip: number = 0;
  take: number = 10;
  filter: string = '';
  search: Subject<string> = new Subject<string>();
  infoPagination: InfoPagination;
  pages: number[] = [];
  currentPage: number = 0;
  constructor(private userService: UserService) {
    super();
  }

  async ngOnInit() {
    await this.populate();
    this.selectedUSer = this.users[0];

    this.search.asObservable().subscribe((event: any) => {
      this.filter = event.target.value;

      if (event.target.value.length >= 2 || !event.target.value) {
        this.skip = 0;
        this.populate();
      }
    });

  }

  populate = async () => {
    let tupleDictioanry = (await this.userService.GetFilteredAndPagined(this.take, this.skip, this.filter)).data;
    this.users = tupleDictioanry.item1;
    this.infoPagination = tupleDictioanry.item2;
    this.pageSelector();
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
    this.displayUser = true;
  }

  deleteUser(userId = null) {
    let userToDelete = userId || this.userToDelete;
    this.userService.delete(userToDelete).then(async () => {
      await this.populate();
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

  pageSelector() {
    let count = 1;
    this.pages = [];
    while (count <= this.infoPagination.total / this.take) {
      this.pages.push(count);
      count += 1;
    }
  }

  async nextPage() {
    if ((this.skip + this.take) > this.infoPagination.total) {
      return;
    }
    this.skip += this.take;
    await this.populate();
  }
  async previewPage() {
    if (this.skip == 0) {
      return
    }
    this.skip -= this.take;
    await this.populate();
  }

  async gotToPage(page: number) {
    if (page != this.currentPage) {
      this.currentPage = page;
      this.skip = (this.take * page) - this.take;
      await this.populate();
    }
  }

  isPageActive(page: number) {
    return page == (this.skip + this.take) / this.take;
  }
}
