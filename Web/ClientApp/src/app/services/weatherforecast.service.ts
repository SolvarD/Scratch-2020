import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class WeatherforecastService {
  constructor(private http: HttpClient) {

  }

  init() {
    return this.http.get(`${environment.API}/weatherforecast`).toPromise();
  }
}

