import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SkillCategory, SkillCategoryDetail } from "../../models/skill";
import { Experience } from "../../models/experience";

@Injectable()
export class ExperienceService {
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Experience[]>(`${environment.API}/Experience/GetAll`).toPromise();
  }

  save(experience: Experience) {
    return this.http.post<Experience>(`${environment.API}/Experience/Save`, experience).toPromise();
  }

  unlinkSkillExperience(ExperienceId: number, SkillId: number) {
    return this.http.delete(`${environment.API}/Experience/Skill/Delete/${ExperienceId}/${SkillId}`).toPromise();
  }

  unlinkManySkillExperience(skillsExperience: Array<SkillCategoryDetail>) {
    return this.http.post(`${environment.API}/Experience/Skill/Delete`, skillsExperience).toPromise();
  }

  deleteExperience(ExperienceId: number) {
    return this.http.delete(`${environment.API}/Experience/Delete/${ExperienceId}`).toPromise();
  }
}

