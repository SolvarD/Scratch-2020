import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ddl-filter',
  templateUrl: './ddl-filter.component.html',
  styleUrls: ['./ddl-filter.component.less']
})
export class DDLComponent implements OnInit {

  search: Subject<string> = new Subject<string>();
  filter: string = '';
  @Input()
  rows: Array<any> = [];
  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  async ngOnInit() {
    this.search.subscribe((event: any) => this.filter = event.target.value);
  }

  selectRow(item: any) {
    this.selectedItem.next(item);
  }
}
