import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SkillCategory, SkillCategoryDetail } from "../../models/skill";
import { Experience } from "../../models/experience";
import { ApiResult } from "../../models/api-result";

@Injectable()
export class ExperienceService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<ApiResult<Experience[]>>(`${environment.API}/Experience/GetAll`).toPromise();
  }

  save(experience: Experience) {
    return this.http.post<ApiResult<Experience>>(`${environment.API}/Experience/Save`, experience).toPromise();
  }

  unlinkSkillExperience(ExperienceId: number, SkillId: number) {
    return this.http.delete<ApiResult<SkillCategoryDetail[]>>(`${environment.API}/Experience/Skill/Delete/${ExperienceId}/${SkillId}`).toPromise();
  }

  unlinkManySkillExperience(skillsExperience: Array<SkillCategoryDetail>) {
    return this.http.post<ApiResult<SkillCategoryDetail[]>>(`${environment.API}/Experience/Skill/Delete`, skillsExperience).toPromise();
  }

  deleteExperience(ExperienceId: number) {
    return this.http.delete<ApiResult<boolean>>(`${environment.API}/Experience/Delete/${ExperienceId}`).toPromise();
  }
}

