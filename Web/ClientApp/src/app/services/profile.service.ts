import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Profile } from "../../models/profile";
import { ApiResult } from "../../models/api-result";

@Injectable()
export class ProfileService {

  public static owner: Profile;

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<ApiResult<Profile[]>>(`${environment.API}/profile/GetAll`).toPromise();
  }
  getOwner() {
    return this.http.get<ApiResult<Profile>>(`${environment.API}/profile/GetOwner`).toPromise().then((profile) => {
      ProfileService.owner = profile.data;
      return profile;
    });
  }

  update(profile: FormData) {
    return this.http.post<ApiResult<Profile>>(`${environment.API}/profile/update`, profile).toPromise().then((profile) => {
      ProfileService.owner = profile.data;
      return profile.data;
    });
  }
}

