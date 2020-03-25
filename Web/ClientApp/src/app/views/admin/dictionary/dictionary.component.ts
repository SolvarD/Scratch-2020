import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryLanguage } from '../../../../models/dictionary-language';
import { Language } from '../../../../models/language';
import { TranslationService } from '../../../services/translation.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  dictionaryLanguage: DictionaryLanguage[] = [];
  languages: Language[] = [];
  displayLanguage: [] =[]
  constructor(private _translationService: TranslationService, private _languageService: LanguageService) {
 
  }

  async ngOnInit() {
    this.dictionaryLanguage = await this._translationService.getAll();
    this.displayLanguage = Array.prototype['groupBy'](this.dictionaryLanguage, g => g.key);
    this.languages = await this._languageService.getAll();
  }
}
