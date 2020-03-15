import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { Language } from "../../models/language";

@Injectable()
export class LanguageService {
  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<Language[]>(`${environment.API}/Language/GetAll`).toPromise();
  }
}

