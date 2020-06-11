import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Role } from "../../models/role";
import { ApiResult } from "../../models/api-result";

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<ApiResult<Role[]>>(`${environment.API}/Role/GetAll`).toPromise();
  }
}
