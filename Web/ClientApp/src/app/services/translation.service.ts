import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";
import { Language } from "../../models/language";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { DictionaryLanguage } from "../../models/dictionary-language";
import { InfoPagination } from "../../models/info-pagination";
import { Tuple } from "../../models/tuple";

@Injectable()
export class TranslationService implements TranslateLoader{

  constructor(private http: HttpClient) { }

  public getTranslation(lang: String): Observable<any>{
    return this.http.get(`${environment.API}/translate/GetById/${lang}`);
  }

  public getAll(): Promise<DictionaryLanguage[]> {
    return this.http.get<DictionaryLanguage[]>(`${environment.API}/translate/GetAll`).toPromise();
  }

  public GetFilteredAndPagined(take = 10, skip = 0, filter = ''): Promise<Tuple<DictionaryLanguage>> {
    return this.http.get<Tuple<DictionaryLanguage>>(`${environment.API}/translate/GetFilteredAndPagined?take=${take}&skip=${skip}&filter=${filter}`).toPromise();
  }

}

