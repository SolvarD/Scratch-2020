import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";

@Injectable()
export class MessageService {
  constructor(private http: HttpClient) {

  }

  getAll(){
    return this.http.get<Message[]>(`${environment.API}/Message/GetAll`).toPromise();
  }
}

