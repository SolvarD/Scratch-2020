import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../../models/experience';

@Component({
    selector: 'app-porte-folio',
    templateUrl: './porte-folio.component.html',
    styleUrls: ['./porte-folio.component.less'],
    standalone: false
})
export class PorteFolioComponent implements OnInit {
  currentSlide: number = 0;
  slides: Array<Experience> = [];

  constructor(private experienceService: ExperienceService) {

  }

  ngOnInit(): void {
    this.experienceService.getAll().then((res) => {
      this.slides = res.data;
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
}
