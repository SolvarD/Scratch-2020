import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Profile } from "../../models/profile";

@Injectable()
export class ProfileService {

  public static owner: Profile;

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Profile[]>(`${environment.API}/profile/GetAll`).toPromise();
  }
  getOwner() {
    return this.http.get<Profile>(`${environment.API}/profile/GetOwner`).toPromise().then((profile) => {
      ProfileService.owner = profile;
      return profile;
    });
  }

  update() {
    return this.http.get<Profile>(`${environment.API}/profile/update`).toPromise();
  }
}

