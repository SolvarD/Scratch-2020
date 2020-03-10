import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class weatherforecastService {
  constructor(private http: HttpClient) {

  }

  init() {
    return this.http.get("https://localhost:44359/weatherforecast").toPromise();
  }
}

