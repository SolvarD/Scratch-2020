import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Profile } from "../../models/profile";
import { ApiResult } from "../../models/api-result";
import { AppDocument } from "../../models/document";

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) {  }

  getAll() {
    return this.http.get<AppDocument[]>(`${environment.API}/document/GetAll`).toPromise();
  }
  update(document: AppDocument) {
    return this.http.put<ApiResult<AppDocument>>(`${environment.API}/document/update`, document).toPromise();
  }
  create(document: AppDocument) {
    return this.http.post<ApiResult<AppDocument>>(`${environment.API}/document/create`, document).toPromise();
  }
}

