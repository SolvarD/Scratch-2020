import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SkillCategory } from "../../models/skill";

@Injectable()
export class SkillService {
  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<SkillCategory[]>(`${environment.API}/skill/GetAll`).toPromise();
  }
}

