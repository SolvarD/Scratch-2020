import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { Language } from "../../models/language";
import { ContactMessage } from "../../models/contact";

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {

  }

  Send(contact: ContactMessage){
    return this.http.post<ContactMessage>(`${environment.API}/Contact`, contact).toPromise();
  }
}

