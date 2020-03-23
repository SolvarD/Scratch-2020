import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../../models/user";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  public static currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

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
    return this.http.get<User>(`${environment.API}/User/Logout`).toPromise().then((data) => {
      localStorage.clear();
      UserService.currentUser = null;
      this.interceptUser(data);
      return data;
    }); 
  }

  UpdateLanguage(id: number) {
    return this.http.put(`${environment.API}/User/Update/Language`, { languageId: id }).toPromise().then((user) => {
      UserService.currentUser.languageId = id;
      this.interceptUser(UserService.currentUser);
      return UserService.currentUser;
    });
  }

  Update(user: User) {
    return this.http.put(`${environment.API}/User/Update`, user).toPromise();
  }

  private interceptUser(user: User): User {
    localStorage.setItem('currentUser', JSON.stringify(user));
    UserService.currentUser = user;
    return user;
  }
}

