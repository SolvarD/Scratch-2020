import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { ProfileService } from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor() { }

  public static async initializeApp(userService: UserService, profileService: ProfileService) {
    console.log('app init');
    if (!UserService.currentUser || !UserService.currentUser.token) {
      return userService.getAnonymousLogin().then((user) => {
        UserService.currentUser = user.data;
        return user;
      })
    }
    profileService.getOwner();
  }
}
