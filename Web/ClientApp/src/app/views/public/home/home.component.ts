import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: false
})
export class HomeComponent implements OnInit {
  elements: Array<any> = [];
  sizeIcon: string = 'fa-7x';
  ngOnInit(): void {
    this.elements = [
      { title: 'PROFILE', route: '/profil', class: `fas fa-id-card ${this.sizeIcon}`},
      { title: 'SKILLS', route: '/skills', class: `fas fa-suitcase ${this.sizeIcon}` },
      { title: 'PORTE_FOLIO', route: '/porte-folio', class: `fas fa-building ${this.sizeIcon}` },
      { title: 'PRICES', route: '/prices', class: `fas fa-money-check-alt ${this.sizeIcon}` }
      //{ title: 'CONTACT_US', route: '/contact', class: `fas fa-envelope ${this.sizeIcon}` }
    ];
  }
  getModulo0(item: any, index: number) {
    return index % 2 == 0;
  }
  getModulo1(item: any, index: number) {
    return index % 2 == 1;
  }
}
