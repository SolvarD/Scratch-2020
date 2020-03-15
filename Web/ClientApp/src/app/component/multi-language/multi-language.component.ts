import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HubRealtimeService } from '../../services/hub-realtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../models/message';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../../models/language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.less']
})
export class MultiLanguageComponent implements OnInit {
  formLanguage: FormGroup;
  languages: Language[] = [];

  constructor(private _fb: FormBuilder, private _languageService: LanguageService, private _translateService: TranslateService) {
   
  }

  async ngOnInit() {
    this.languages = await this._languageService.getAll();

    this.formLanguage = this._fb.group({
      languageId: [this._translateService.getDefaultLang(), [Validators.required]]
    });

    this.formLanguage.valueChanges.subscribe((val) => {
      this._translateService.use(val.languageId);
    });
  }
}
