import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../../models/user";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  public static currentUser: User;

  getAll() {
    return this.http.get<User[]>(`${environment.API}/User/GetAll`).toPromise();
  }
  getByEmailPassword(email: string, password: string) {
    return this.http.post<User>(`${environment.API}/User/Login`, { email: email, password: password }).toPromise();
  }
  getAnonymousLogin() {
    return this.http.get<User>(`${environment.API}/User/Login`).toPromise();
  }
}

