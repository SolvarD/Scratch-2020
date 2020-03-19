import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable()
export class AppInitService {
  constructor(private userService: UserService) { }

  initializeApp() {
    return this.userService.getAnonymousLogin().then((user) => {
      UserService.currentUser = user;
      return user;
    })
  }
}
