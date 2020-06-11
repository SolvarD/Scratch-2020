import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { ProfileService } from "./profile.service";

@Injectable()
export class AppInitService {
  constructor(private userService: UserService, private profileService: ProfileService) { }

  initializeApp() {
    if (!UserService.currentUser || !UserService.currentUser.token) {
      return this.userService.getAnonymousLogin().then((user) => {
        UserService.currentUser = user.data;
        return user;
      })
    }
    this.profileService.getOwner();
  }
}
