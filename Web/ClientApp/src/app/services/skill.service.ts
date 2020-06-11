import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SkillCategory, SkillCategoryDetail } from "../../models/skill";
import { ApiResult } from "../../models/api-result";

@Injectable()
export class SkillService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<ApiResult<SkillCategory[]>>(`${environment.API}/Skill/GetAll`).toPromise();
  }
  getAllSkillDetail() {
    return this.http.get < ApiResult<SkillCategoryDetail[]>>(`${environment.API}/Skill/Detail/GetAll`).toPromise();
  } 
}

