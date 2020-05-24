import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any) {
      if (typeof (filter) == 'object') {
        let key = Object.keys(filter)[0];
        return items.filter(item => item[key].toLowerCase().indexOf(filter[key].toLowerCase())> -1);
      }
      else if (typeof (filter) == 'function') {
        return items.filter((item,index) => {
          return filter(item, index);
        });
      }
      else {
        return [];
      }
    }

}
