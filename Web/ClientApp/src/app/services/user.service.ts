import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get("https://localhost:44359/User/GetAll").toPromise();
  }
}

