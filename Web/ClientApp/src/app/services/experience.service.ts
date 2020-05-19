import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SkillCategory } from "../../models/skill";
import { Experience } from "../../models/experience";

@Injectable()
export class ExperienceService {
  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<Experience[]>(`${environment.API}/Experience/GetAll`).toPromise();
  }
}

