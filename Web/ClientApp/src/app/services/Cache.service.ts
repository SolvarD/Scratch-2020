import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  datas: any = {};

  constructor() {

  }

  getCache<T>(url: string){
    return <T>this.datas[url];
  }

  setCache(url: string, data: any) {
    return this.datas[url] = data;
  }
}

