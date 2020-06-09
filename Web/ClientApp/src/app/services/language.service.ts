import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { Language } from "../../models/language";
import { CacheService } from "./cache.service";

@Injectable()
export class LanguageService {
  constructor(private http: HttpClient,private cache: CacheService) {

  }

  getAll(): Promise<Language[]> {
    let url = `${environment.API}/Language/GetAll`;

    if (this.cache.getCache(url)) {
      return this.cache.getCache<Promise<Language[]>>(url);
    }

    let promise = this.http.get<Language[]>(url).toPromise();
    return promise.then((res) => {
      this.cache.setCache(url, promise);
      return res;
    });
  }
}

