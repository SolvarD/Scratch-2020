import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Profile } from "../../models/profile";

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Profile[]>(`${environment.API}/profile/GetAll`).toPromise();
  }
}

