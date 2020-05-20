import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../../models/experience';
import { BaseComponent } from '../../../../models/base-component';

@Component({
  selector: 'app-admin-porte-folio',
  templateUrl: './admin-porte-folio.component.html',
  styleUrls: ['./admin-porte-folio.component.less']
})
export class AdminPorteFolioComponent extends BaseComponent implements OnInit {

  currentSlide: number = 0;
  slides: Array<Experience> = [];
  displayBloc: boolean[] = [];

  constructor(private experienceService: ExperienceService) {
    super();
  }

  ngOnInit(): void {
    this.experienceService.getAll().then((res) => {
      this.slides = res;
    });
  }

  nextSlide() {
    if (this.currentSlide == (this.slides.length - 1)) {
      this.currentSlide = 0;
    } else {
      this.currentSlide += 1;
    }
  }

  previewSlide() {
    if (this.currentSlide == 0) {
      this.currentSlide = this.slides.length - 1;
    }
    else {
      this.currentSlide -= 1;
    }
  }

  goTo(index: number) {
    this.currentSlide = index;
  }

  display(bloc: number) {
    this.displayBloc[bloc] = true;
  }
  hide(bloc: number) {
    this.displayBloc[bloc] = false;
  }
}
