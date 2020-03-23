import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "./user.service";
import { enumRole } from "../../models/user";
import { BaseComponent } from "../../models/base-component";

@Injectable()
export class AuthGuard extends BaseComponent implements CanActivate {
  constructor(
    public router: Router,
    private user: UserService
  ) {
    super();
  }

  async canActivate(route: ActivatedRouteSnapshot) {

    if (this.canDisplay) {
      return true;
    }
    this.router.navigate(["error/401"]);
    return false;
  }
}
