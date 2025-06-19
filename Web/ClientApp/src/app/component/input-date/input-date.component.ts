import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../../models/language';
import { BaseComponent } from '../../../models/base-component';
import { UserService } from '../../services/user.service';
import { FormControlName, UntypedFormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.less']
})
export class InputDateComponent extends BaseComponent implements OnInit {

  search: Subject<string> = new Subject<string>();
  date: string = '';
  @Input()
  parentFormGroup: UntypedFormGroup;
  @Input()
  parentFormControl: string = '';
  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter();
  languages: Array<Language> = [];
  currentLanguage: Language = new Language();
  formatDate: string = 'dd/MM/yyyy';
  constructor(private languageService: LanguageService, ) {
    super();
  }

  async ngOnInit() {
    this.date = this.parentFormGroup.get(this.parentFormControl).value ? this.parentFormGroup.get(this.parentFormControl).value.toLocaleDateString() : null;
    
    this.languages = (await this.languageService.getAll()).data;
    this.currentLanguage = this.languages.find(g => g.languageId == UserService.currentUser.languageId);
    this.formatDate = this.currentLanguage.format;

    this.parentFormGroup.controls[this.parentFormControl].setValue(this.getDate(this.date));
    this.search.subscribe((event: any) => {
      this.parentFormGroup.get(this.parentFormControl).markAsDirty();
      this.parentFormGroup.get(this.parentFormControl).markAsTouched();

      this.parentFormGroup.controls[this.parentFormControl].setValue(this.getDate(event.target.value));
    });
  }

  getDate(date: string) {
    if (!date) { return null;}

    let arrayDate: Array<string> = date.split('/');

    if (arrayDate.length <= 1) { return null; }

    switch (this.currentLanguage.code) {
      case 'fr-FR':
        return `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
      case 'en-US':
        return `${arrayDate[0]}-${arrayDate[1]}-${arrayDate[2]}`;
      default:
        return `${arrayDate[0]}-${arrayDate[1]}-${arrayDate[2]}`;
    }
  }
  isValidField() {
    if (!(this.parentFormGroup.get(this.parentFormControl).dirty || this.parentFormGroup.get(this.parentFormControl).touched)) {
      return true;
    }
    return this.parentFormGroup.get(this.parentFormControl).valid && (this.parentFormGroup.get(this.parentFormControl).dirty || this.parentFormGroup.get(this.parentFormControl).touched);
  }
}
