import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    try {
      return true;
    } catch (e) {
      this.router.navigate(["error/403"]);
      return false;
    }
  }
}
