import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private user: UserService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot) {

    if (UserService.currentUser.userId) {
      return true;
    }
    this.router.navigate(["error/403"]);
    return false;
  }
}
