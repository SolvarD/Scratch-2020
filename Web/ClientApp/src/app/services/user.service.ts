import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../../models/user";
import { Subject } from "rxjs";
import { Tuple } from "../../models/tuple";

@Injectable()
export class UserService {

  public static emitCurrentUser = new Subject<User>();
  public static subCurrentUser = UserService.emitCurrentUser.asObservable();
  constructor(private http: HttpClient) {
  }

  public static currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  


  getAll() {
    return this.http.get<User[]>(`${environment.API}/User/GetAll`).toPromise();
  }

  public GetFilteredAndPagined(take = 10, skip = 0, filter = ''): Promise<Tuple<User>> {
    return this.http.get<Tuple<User>>(`${environment.API}/User/GetFilteredAndPagined?take=${take}&skip=${skip}&filter=${filter}`).toPromise();
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

  updateLanguage(id: number) {
    return this.http.put(`${environment.API}/User/Update/Language`, { languageId: id }).toPromise().then((user) => {
      UserService.currentUser.languageId = id;
      this.interceptUser(UserService.currentUser);
      return UserService.currentUser;
    });
  }

  update(user: User) {
    return this.http.put(`${environment.API}/User/Update`, user).toPromise();
  }

  delete(userId: number) {
    return this.http.delete(`${environment.API}/User/Delete/${userId}`).toPromise();
  }

  create(user: User) {
    return this.http.post(`${environment.API}/User/Create`, user).toPromise();
  }

  private interceptUser(user: User): User {
    localStorage.setItem('currentUser', JSON.stringify(user));
    UserService.currentUser = user;
    UserService.emitCurrentUser.next(user);
    return user;
  }
}

