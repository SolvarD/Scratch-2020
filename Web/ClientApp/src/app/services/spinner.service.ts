import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { Language } from "../../models/language";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private nbRequest: number = 0;

  constructor() {

  }

  incrementRequest() {
    this.nbRequest += 1;
  }

  decrementRequest() {
    this.nbRequest -= 1;
  }

  resetNbRequest() {
    this.nbRequest = 0;
  }

  get displaySpinner() {
    return this.nbRequest > 0;
  }
  

}

