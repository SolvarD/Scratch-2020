import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get(`${environment.API}/User/GetAll`).toPromise();
  }
}

