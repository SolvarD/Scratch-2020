import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ContactMessage } from "../../models/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {

  }

  Send(contact: ContactMessage){
    return this.http.post<ContactMessage>(`${environment.API}/Contact`, contact).toPromise();
  }
}

