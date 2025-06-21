import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryLanguage } from '../../../../models/dictionary-language';
import { Language } from '../../../../models/language';
import { TranslationService } from '../../../services/translation.service';
import { LanguageService } from '../../../services/language.service';
import { InfoPagination } from '../../../../models/info-pagination';
import { Subject } from 'rxjs';
import { BaseComponent } from '../../../../models/base-component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.less'],
    standalone: true,
    imports:[TranslateModule, CommonModule]
})
export class DictionaryComponent extends BaseComponent implements OnInit {
  dictionaryLanguage: DictionaryLanguage[] = [];
  infoPagination: InfoPagination;
  languages: Language[] = [];
  displayLanguage: [] = []
  skip: number = 0;
  take: number = 10;
  filter: string = '';
  pages: number[] = [];
  currentPage: number = 1;
  search: Subject<string> = new Subject<string>();

  constructor(private _translationService: TranslationService, private _languageService: LanguageService) {
    super();
  }

  async ngOnInit() {
    await this.populate();
    this.languages = (await this._languageService.getAll()).data;

    this.search.asObservable().subscribe((event: any) => {
      this.filter = event.target.value;

      if (event.target.value.length >= 2 || !event.target.value) {
        this.skip = 0;
        this.populate();
      }
    });
  }

  populate = async () => {
    let tupleDictioanry = await this._translationService.GetFilteredAndPagined(this.take, this.skip, this.filter);
    this.dictionaryLanguage = tupleDictioanry.item1;
    this.infoPagination = tupleDictioanry.item2;
    this.displayLanguage = Array.prototype['groupBy'](this.dictionaryLanguage, g => g.key);
    this.pageSelector();
  }

  async nextPage() {
    if ((this.skip + this.take) >= this.infoPagination.total) {
      return;
    }
    this.skip += this.take;
    await this.populate();
  }
  async previewPage() {
    if (this.skip == 0) {
      return
    }
    this.skip -= this.take;
    await this.populate();
  }

  async gotToPage(page: number) {
    if (page != this.currentPage) {
      this.currentPage = page;
      this.skip = (this.take * page) - this.take;
      await this.populate();
    }
  }

  isPageActive(page: number) {
    return page == (this.skip + this.take) / this.take;
  }

  pageSelector() {
    let count = 1;
    this.pages = [];
    while (count <= Math.ceil(this.infoPagination.total / this.take)) {
      this.pages.push(count);
      count += 1;
    }
  }

  edit(languages: any) {
    languages.edit = true;
  }
  cancelEdit(languages: any) {
    console.log(languages);
    languages.edit = false;
  }
  save() { }
}
