import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { ApiResult } from "../../models/api-result";

@Injectable()
export class MessageService {
  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<ApiResult<Message[]>>(`${environment.API}/Message/GetAll`).toPromise();
  }
}

