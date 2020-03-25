import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Role } from "../../models/role";

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Role[]>(`${environment.API}/Role/GetAll`).toPromise();
  }
}
