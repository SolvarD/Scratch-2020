import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../../models/experience';
import { BaseComponent } from '../../../../models/base-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-porte-folio',
  templateUrl: './admin-porte-folio.component.html',
  styleUrls: ['./admin-porte-folio.component.less']
})
export class AdminPorteFolioComponent extends BaseComponent implements OnInit {

  currentSlide: number = 0;
  slides: Array<Experience> = [];
  displayBloc: boolean[] = [];
  formsExperiences: FormGroup[] = [];

  constructor(private experienceService: ExperienceService, private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.experienceService.getAll().then((res) => {

      res.forEach((experience) => {
        this.formsExperiences.push(this.buildForm(experience));
      });

      this.slides = res;
    });
  }


  buildForm(item: Experience) {
    return this._fb.group({
      start: [{ value: new Date(item.start.toString()).toLocaleDateString(), disabled: !this.canEdit }, Validators.required],
      end: [{ value: item.end? new Date(item.end.toString()).toLocaleDateString() : null,disabled: !this.canEdit }, Validators.required],
      description: [{ value: item.description,disabled: !this.canEdit }, Validators.required]
    });
  }

  display(bloc: number) {
    this.displayBloc[bloc] = true;
  }
  hide(bloc: number) {
    this.displayBloc[bloc] = false;
  }
}
