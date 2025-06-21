import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { SpinnerService } from "./spinner.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.incrementRequest();
    if (UserService.currentUser)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${UserService.currentUser.token}` },
        withCredentials: true
        //headers: request.headers.set("Authorization", "Bearer " + UserService.currentUser.token)
      });

    return next.handle(request).pipe((g) => {
      this.spinner.decrementRequest();
      return g;
    });
  }
}
