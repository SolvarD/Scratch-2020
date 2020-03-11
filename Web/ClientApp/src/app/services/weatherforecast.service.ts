import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class WeatherforecastService {
  constructor(private http: HttpClient) {

  }

  init() {
    return this.http.get("https://localhost:44359/weatherforecast").toPromise();
  }
}

