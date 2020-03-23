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
    return this.http.post<User>(`${environment.API}/User/Login`, { email: email, password: password }).toPromise().then(this.interceptUser);
  }
  getAnonymousLogin(): Promise<User> {

    var user: User = JSON.parse(localStorage.getItem('currentUser'))

    if (user && user.userId) {
      this.interceptUser(JSON.parse(localStorage.getItem('currentUser')))
      return new Promise((resolve, reject) => {
        this.interceptUser(user);
        resolve(user)
      });
    }
    return this.http.get<User>(`${environment.API}/User/Login`).toPromise().then(this.interceptUser);
  }

  logout() {
    return this.http.post<User>(`${environment.API}/User/Logout`).toPromise().then((data) => {
      localStorage.clear();
      UserService.currentUser = null;
      return data;
    }); 
  }

  private interceptUser(user: User): User {
    localStorage.setItem('currentUser', JSON.stringify(user));
    UserService.currentUser = user;
    return user;
  }
}

