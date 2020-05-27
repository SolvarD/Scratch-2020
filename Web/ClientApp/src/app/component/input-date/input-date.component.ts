import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../../models/language';
import { BaseComponent } from '../../../models/base-component';
import { UserService } from '../../services/user.service';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.less']
})
export class InputDateComponent extends BaseComponent implements OnInit {

  search: Subject<string> = new Subject<string>();
  date: string = '';
  
  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter();
  languages: Array<Language> = [];
  currentLanguage: Language = new Language();
  formatDate: string = 'dd/MM/yyyy';

  constructor(private languageService: LanguageService) {
    super();
  }

  async ngOnInit() {
    this.languages = await this.languageService.getAll();
    this.currentLanguage = this.languages.find(g => g.languageId == UserService.currentUser.languageId);
    this.formatDate = this.currentLanguage.format;

    this.search.subscribe((event: any) => {
      this.date = event.target.value
    });

    console.log('input-date formControl');
  }

  selectRow(item: any) {
    this.selectedItem.next(item);
  }
}
